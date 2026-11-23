import { McpServer } from '@modelcontextprotocol/server';
import * as z from 'zod/v4';
import { readFile } from 'node:fs/promises';
import { Project } from './project.js';
import { knowledgeTopics, knowledgeDescriptions, knowledgeIndex, readKnowledge, recommendKnowledge } from './knowledge.js';
const text = (value: unknown) => ({content:[{type:'text' as const,text:typeof value === 'string'?value:JSON.stringify(value,null,2)}]});
export const guidance = () => readFile(new URL('../skills/frontend-ui/SKILL.md',import.meta.url),'utf8');
export function createServer(project: Project) {
  const server = new McpServer({name:'watermelon-pixel',version:'0.2.9'});
  const register = (name:string, description:string, inputSchema:Record<string,z.ZodType>, handler:(input:any)=>Promise<unknown>, writes=false) => server.registerTool(name,{description,inputSchema,annotations:{readOnlyHint:!writes,destructiveHint:writes,openWorldHint:false}},async (input:any) => {
    try { return text(await handler(input)); } catch(e) { return {...text({error:(e as Error).message}),isError:true}; }
  });
  register('inspect_project','List bounded frontend files and package manifest in the configured project.',{},()=>project.inspect());
  register('inspect_ui_system','Summarize likely components, UI libraries, stylesheets, design-token candidates, and installed UI quality tooling in the configured project. Results use bounded static heuristics and should be verified in source.',{},()=>project.uiInventory());
  register('find_ui_patterns','Find a literal term in UI source; returns up to 30 matching file excerpts.',{query:z.string().min(1).max(120)},async ({query})=>{
    const listing=await project.files(); const matches=[];
    for (const file of listing.files) {
      if (/\.(json|md)$/.test(file)) continue;
      let source; try {source=await project.read(file);} catch {continue;}
      const lines=source.split('\n'); const index=lines.findIndex(l=>l.toLowerCase().includes(query.toLowerCase()));
      if(index>=0) matches.push({file,line:index+1,excerpt:lines.slice(Math.max(0,index-2),index+4).join('\n').slice(0,2500)});
      if(matches.length>=30) break;
    }
    return {matches,scanTruncated:listing.truncated,resultLimit:30};
  });
  register('read_ui_file','Read a UI source, package config, or documentation file.',{file:z.string().min(1)},({file})=>project.read(file));
  register('plan_ui_change','Return project context, a bounded UI inventory, a plain-language design brief, and a quality checklist for the host assistant. Does not call an LLM.',{request:z.string().min(1).max(10000)},async ({request})=>({request,project:await project.inspect(),uiSystem:await project.uiInventory(),designKnowledge:{profile:'bundled frontend guidance',usage:'Adapt guidance to the target project. Verify candidate components, tokens, and available quality tools in their source files before implementation.',recommendedTopics:recommendKnowledge(request),availableTopics:knowledgeIndex()},brief:{audienceAndContext:'Who will use this screen, and where or when will they use it?',userOutcome:'What should the user be able to decide or complete?',contentAndData:'What information, fields, or records must be present?',actions:'What is the primary action, and which actions are secondary or destructive?',visualDirection:'What existing product style should be preserved, or what direction did the user request?',constraints:'What responsive, accessibility, technical, and product constraints apply?',acceptance:'What observable result will show that this UI meets the request?'},steps:['Classify the surface by its main purpose: persuade, operate, explain, or explore; preserve an established visual direction unless redesign is requested.','Use the UI inventory to locate design-system entry points, candidate components, and quality tools; verify relevant files before relying on static guesses.','Turn the request into a brief covering audience, outcome, content, actions, visual direction, constraints, and observable acceptance checks. Ask only for decisions that materially affect the result.','Choose a page recipe and define the composition tree before coding: shell, page heading, grouped content, primary action, and result or feedback region.','Define interaction contracts for each non-native control, including semantics, keyboard behavior, focus entry/return, validation, pending, empty, and error states. Prefer the installed accessible component over a homegrown widget.','Reuse the project\'s tokens, components, and dependencies. Avoid adding or mixing libraries unless the request requires it.','Generate a scoped change, preview it, and explain the files and assumptions in plain language.','Apply only the requested edits; use matching existing build, test, lint, accessibility, and visual-review tools when available.','Review the relevant desktop and narrow layouts and key states together, fix meaningful findings in one batch, then make one confirmation pass if the host can render the UI.']}));
  register('get_design_knowledge','Read frontend engineering guidance by topic. Start with overview. Use security when working with untrusted content, sessions, permissions, sensitive data, or browser trust boundaries.',{topic:z.enum(knowledgeTopics).default('overview')},async ({topic})=>({profile:'bundled frontend guidance',topic,availableTopics:knowledgeIndex(),content:await readKnowledge(topic)}));
  register('get_component_guidance','Read the frontend engineering skill before building, changing, or reviewing application UI. It explains which guidance to consult and how to apply it to the project.',{},()=>guidance());
  register('create_or_update_component','Preview or apply one UI file. Defaults to preview. Updates require exact expectedContent; code is supplied by the host assistant.',{file:z.string().min(1),content:z.string().max(200000),expectedContent:z.string().max(200000).optional(),dryRun:z.boolean().default(true)},input=>project.edit(input),true);
  server.registerResource('frontend-skill','ui://skills/frontend-ui',{mimeType:'text/markdown',description:'Bundled frontend workflow instructions'},async uri=>({contents:[{uri:uri.href,mimeType:'text/markdown',text:await guidance()}]}));
  for (const topic of knowledgeTopics) {
    const mimeType = topic === 'tokens' ? 'application/json' : 'text/markdown';
    server.registerResource(`morpheus-${topic}`, `ui://knowledge/morpheus/${topic}`, {mimeType, description:knowledgeDescriptions[topic]}, async uri => ({contents:[{uri:uri.href,mimeType,text:await readKnowledge(topic)}]}));
  }
  return server;
}
