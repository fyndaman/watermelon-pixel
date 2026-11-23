import {test} from 'node:test';
import assert from 'node:assert/strict';
import {mkdtemp,writeFile,readFile,rm,symlink} from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import {Client} from '@modelcontextprotocol/client';
import {StdioClientTransport} from '@modelcontextprotocol/client/stdio';
import {openProject} from '../dist/project.js';

test('stdio discovery, resources, preview, create, stale update, and error handling',async()=>{
 const root=await mkdtemp(path.join(os.tmpdir(),'ui-mcp-'));
 const client=new Client({name:'integration',version:'1.0.0'});
 try {
  await writeFile(path.join(root,'package.json'),JSON.stringify({dependencies:{react:'*'}}));
  await client.connect(new StdioClientTransport({command:process.execPath,args:['dist/cli.js','--root',root],stderr:'pipe'}));
  const {tools}=await client.listTools(); assert.equal(tools.length,7);
  const call=async(name,args={})=>client.callTool({name,arguments:args});
  const parse=r=>JSON.parse(r.content[0].text);
  assert.equal(parse(await call('inspect_project')).manifest.dependencies.react,'*');
  const resource=await client.readResource({uri:'ui://skills/frontend-ui'}); assert.match(resource.contents[0].text,/name: frontend-ui/);
  const overview=parse(await call('get_design_knowledge'));
  assert.equal(overview.topic,'overview');
  const listed=await client.listResources();
  for (const entry of overview.availableTopics) {
    assert.ok(listed.resources.some(r=>r.uri===entry.uri));
    const result=await call('get_design_knowledge',{topic:entry.topic});
    assert.ok(!result.isError);
    const knowledge=parse(result);
    const resource=await client.readResource({uri:entry.uri});
    assert.equal(resource.contents[0].text,knowledge.content);
    assert.ok(knowledge.content.length>100);
    if(entry.topic==='tokens') {
      assert.equal(resource.contents[0].mimeType,'application/json');
      const tokens=JSON.parse(knowledge.content);
      assert.equal(tokens.colors.light['--color-primary'],'#2e31be');
      assert.equal(tokens.colors.dark['--color-primary'],'#6366f1');
      assert.equal(tokens.layout.pagePaddingMobile,'16px');
    }
  }
  assert.ok((await call('get_design_knowledge',{topic:'../../package.json'})).isError);
  const plan=parse(await call('plan_ui_change',{request:'Add a paginated monitoring table'}));
  assert.ok(plan.designKnowledge.recommendedTopics.includes('data-workflows'));
  const content='export const Button = () => <button>Save</button>;';
  const preview=parse(await call('create_or_update_component',{file:'src/Button.tsx',content})); assert.equal(preview.dryRun,true);
  await assert.rejects(readFile(path.join(root,'src/Button.tsx')));
  assert.ok(!(await call('create_or_update_component',{file:'src/Button.tsx',content,dryRun:false})).isError);
  assert.equal(await readFile(path.join(root,'src/Button.tsx'),'utf8'),content);
  assert.ok((await call('create_or_update_component',{file:'src/Button.tsx',content:'changed',expectedContent:'stale',dryRun:false})).isError);
  assert.equal(parse(await call('find_ui_patterns',{query:'button'})).matches.length,1);
  assert.ok((await call('read_ui_file',{file:'../outside.tsx'})).isError);
  assert.ok((await call('create_or_update_component',{file:'src/Button.tsx',content:'updated',expectedContent:content,dryRun:false})).content);
  assert.equal(await readFile(path.join(root,'src/Button.tsx'),'utf8'),'updated');
 } finally { await client.close(); await rm(root,{recursive:true,force:true}); }
});
test('reject symlinks and excluded paths',async()=>{
 const root=await mkdtemp(path.join(os.tmpdir(),'ui-mcp-'));
 try {
  const project=await openProject(root); await symlink(os.tmpdir(),path.join(root,'linked'));
  for(const file of ['linked/escape.tsx','node_modules/a.tsx','.env','/tmp/a.tsx','../a.tsx']) await assert.rejects(project.resolve(file,true));
 } finally {await rm(root,{recursive:true,force:true});}
});
