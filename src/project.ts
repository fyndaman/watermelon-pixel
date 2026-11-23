import { realpath, readdir, readFile, stat, lstat, mkdir, open } from 'node:fs/promises';
import path from 'node:path';

const ignored = new Set(['node_modules','.git','dist','build','.next','coverage','.env']);
const uiFile = /\.(tsx?|jsx?|vue|svelte|css|scss|json|md)$/;
const editable = /\.(tsx?|jsx?|vue|svelte|css|scss)$/;
export class Project {
  constructor(readonly root: string) {}
  async resolve(relative: string, allowMissing = false): Promise<string> {
    if (!relative || path.isAbsolute(relative) || relative.split(/[\\/]/).some(p => p === '..' || p.startsWith('.') || ignored.has(p))) throw new Error('Use a visible project-relative path without parent traversal or excluded directories.');
    const target = path.resolve(this.root, relative);
    if (!target.startsWith(this.root + path.sep)) throw new Error('Path escapes project root.');
    let current = this.root;
    for (const segment of path.relative(this.root,target).split(path.sep)) {
      current = path.join(current,segment);
      try { if ((await lstat(current)).isSymbolicLink()) throw new Error('Symbolic links are not supported.'); }
      catch (e) { if (allowMissing && (e as NodeJS.ErrnoException).code === 'ENOENT') continue; throw e; }
    }
    return target;
  }
  async files() {
    const result: string[] = []; let entriesSeen = 0; let truncated = false;
    const walk = async (dir: string, depth: number): Promise<void> => {
      if (depth > 10) { truncated = true; return; }
      for (const entry of await readdir(dir,{withFileTypes:true})) {
        if (++entriesSeen > 15000 || result.length >= 3000) { truncated = true; return; }
        if (entry.name.startsWith('.') || ignored.has(entry.name) || entry.isSymbolicLink()) continue;
        const full = path.join(dir,entry.name);
        if (entry.isDirectory()) await walk(full,depth+1);
        else if (uiFile.test(entry.name)) result.push(path.relative(this.root,full));
      }
    };
    await walk(this.root,0); return {files:result.sort(),truncated};
  }
  async read(file: string) {
    const full = await this.resolve(file);
    if (!uiFile.test(file) || (await stat(full)).size > 200000) throw new Error('Only UI source/config/documentation files up to 200 KB are supported.');
    return readFile(full,'utf8');
  }
  async inspect() {
    const listing = await this.files();
    let manifest: Record<string, unknown> = {};
    try { manifest = JSON.parse(await this.read('package.json')); } catch { /* Projects can lack a manifest. */ }
    return {root:this.root,...listing,manifest};
  }
  async uiInventory() {
    const listing = await this.files();
    const sourceFiles = listing.files.filter(file => /\.(tsx?|jsx?|vue|svelte)$/.test(file));
    const styleFiles = listing.files.filter(file => /\.(css|scss)$/.test(file));
    const filesToScan = sourceFiles.slice(0, 600).concat(styleFiles.slice(0, 300));
    const componentCandidates: {name:string;file:string}[] = [];
    const componentKeys = new Set<string>();
    const tokenNames = new Set<string>();
    let componentCandidateCount = 0;
    let scannedSourceFiles = 0;
    let scannedStyleFiles = 0;

    for (const file of filesToScan) {
      let source: string;
      try { source = await this.read(file); } catch { continue; }
      const isStyle = /\.(css|scss)$/.test(file);
      if (isStyle) {
        scannedStyleFiles++;
        for (const match of source.matchAll(/--[a-zA-Z0-9_-]+\s*:|\$[a-zA-Z][a-zA-Z0-9_-]*\s*:/g)) {
          tokenNames.add(match[0].replace(/\s*:\s*$/, ''));
        }
        continue;
      }

      scannedSourceFiles++;
      const addComponent = (name:string) => {
        const key = `${name}:${file}`;
        if (componentKeys.has(key)) return;
        componentKeys.add(key);
        componentCandidateCount++;
        if (componentCandidates.length < 120) componentCandidates.push({name,file});
      };
      for (const pattern of [
        /\bexport\s+(?:default\s+)?(?:async\s+)?function\s+([A-Z][A-Za-z0-9_$]*)/g,
        /\bexport\s+(?:default\s+)?(?:const|let|class)\s+([A-Z][A-Za-z0-9_$]*)/g,
      ]) {
        for (const match of source.matchAll(pattern)) addComponent(match[1]);
      }
      if (/\.(vue|svelte)$/.test(file)) {
        const basename = file.split(/[\\/]/).pop()?.replace(/\.(vue|svelte)$/,'') ?? '';
        if (/^[A-Z][A-Za-z0-9_$]*$/.test(basename)) addComponent(basename);
      }
    }

    let manifest: Record<string, unknown> = {};
    try { manifest = JSON.parse(await this.read('package.json')); } catch { /* A project may not have a package manifest. */ }
    const dependencyGroups = [manifest.dependencies, manifest.devDependencies, manifest.peerDependencies];
    const dependencies = [...new Set(dependencyGroups.flatMap(group => group && typeof group === 'object' ? Object.keys(group) : []))].sort();
    const frameworks = [
      ['react', 'React'], ['next', 'Next.js'], ['vue', 'Vue'], ['nuxt', 'Nuxt'],
      ['svelte', 'Svelte'], ['@sveltejs/kit', 'SvelteKit'], ['astro', 'Astro'],
    ].filter(([packageName]) => dependencies.includes(packageName)).map(([, label]) => label);
    const uiLibraries = dependencies.filter(name => /tailwind|styled-components|@emotion|@mui|chakra|radix|antd|mantine|bootstrap|shadcn|lucide|heroicons|icon/i.test(name)).slice(0, 40);
    const qualityTools = {
      componentExplorer: dependencies.filter(name => name === 'storybook' || name.startsWith('@storybook/')).slice(0, 20),
      componentTesting: dependencies.filter(name => /^(vitest|jest|@testing-library\/|@storybook\/test)/.test(name)).slice(0, 30),
      browserTesting: dependencies.filter(name => /playwright|cypress|puppeteer/i.test(name)).slice(0, 20),
      accessibility: dependencies.filter(name => /axe-core|pa11y|jsx-a11y|@storybook\/addon-a11y/i.test(name)).slice(0, 20),
      visualTesting: dependencies.filter(name => /chromatic|percy|loki|playwright|cypress/i.test(name)).slice(0, 20),
    };
    const scriptsObject = manifest.scripts && typeof manifest.scripts === 'object' ? manifest.scripts as Record<string, unknown> : {};
    const availableScripts = Object.keys(scriptsObject).filter(name => /build|test|lint|check|typecheck|storybook|e2e|visual|accessibility|a11y/i.test(name)).sort();
    const themeFiles = styleFiles.filter(file => /theme|token|variable|palette|color/i.test(file)).slice(0, 40);
    const fileCounts = listing.files.reduce((counts:Record<string,number>,file) => {
      const extension = file.slice(file.lastIndexOf('.')).toLowerCase();
      counts[extension] = (counts[extension] ?? 0) + 1;
      return counts;
    }, {});

    return {
      root:this.root,
      fileCounts,
      frameworks,
      uiLibraries,
      qualityTools,
      availableScripts,
      componentCandidates:componentCandidates.sort((a,b) => a.name.localeCompare(b.name) || a.file.localeCompare(b.file)),
      componentCandidateCount,
      styleFiles:styleFiles.slice(0, 60),
      themeFiles,
      designTokenCandidates:[...tokenNames].sort().slice(0, 80),
      scanned:{sourceFiles:scannedSourceFiles,styleFiles:scannedStyleFiles},
      truncated:listing.truncated || sourceFiles.length > 600 || styleFiles.length > 300 || componentCandidateCount > 120 || tokenNames.size > 80,
      note:'Static source heuristics only. Component and token candidates need confirmation in their source files; this inventory does not inspect rendered UI.',
    };
  }
  async edit(input: {file:string; content:string; expectedContent?:string; dryRun:boolean}) {
    if (!editable.test(input.file) || Buffer.byteLength(input.content)>200000) throw new Error('Edits require a UI source file up to 200 KB.');
    const full = await this.resolve(input.file,true);
    let before: string | undefined;
    try { before = await this.read(input.file); } catch(e) { if ((e as NodeJS.ErrnoException).code !== 'ENOENT') throw e; }
    if (before !== undefined && (input.expectedContent === undefined || input.expectedContent !== before)) throw new Error('Existing files require expectedContent matching the current complete file. Read the file again.');
    if (before === undefined && input.expectedContent !== undefined) throw new Error('File no longer exists.');
    if (!input.dryRun) {
      await mkdir(path.dirname(full),{recursive:true});
      await this.resolve(input.file,true);
      if (before === undefined) { const handle=await open(full,'wx'); try { await handle.writeFile(input.content); } finally { await handle.close(); } }
      else { const {writeFile}=await import('node:fs/promises'); await writeFile(full,input.content); }
    }
    return {file:input.file,dryRun:input.dryRun,operation:before===undefined?'create':'update',before:before??null,after:input.content};
  }
}
export async function openProject(root:string) { const resolved=await realpath(root); if (!(await stat(resolved)).isDirectory()) throw new Error('Project root must be a directory.'); return new Project(resolved); }
