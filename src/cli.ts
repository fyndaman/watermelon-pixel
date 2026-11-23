#!/usr/bin/env node
import { serveStdio } from '@modelcontextprotocol/server/stdio';
import { openProject } from './project.js';
import { createServer, guidance } from './server.js';
const args=process.argv.slice(2);
try {
  if (args.length===1 && args[0]==='--print-skill') { process.stdout.write(await guidance()); }
  else if (args.length===1 && args[0]==='--help') { process.stdout.write('watermelon-pixel --root <project-directory>\nwatermelon-pixel --print-skill\nRequires Node.js 22+. Uses stdio for MCP; logs go to stderr.\n'); }
  else {
    if (args.length!==2 || args[0]!=='--root') throw new Error('Usage: watermelon-pixel --root <project-directory>');
    const project=await openProject(args[1]);
    serveStdio(()=>createServer(project));
  }
} catch(e) { console.error((e as Error).message); process.exitCode=1; }
