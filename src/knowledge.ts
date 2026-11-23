import { readFile } from 'node:fs/promises';

// The closed topic map also prevents resource/tool input from selecting arbitrary files.
export const knowledgeTopics = ['overview', 'briefs', 'architecture', 'foundations', 'components', 'interactions', 'data-workflows', 'recipes', 'security', 'quality', 'sources', 'tokens'] as const;
export type KnowledgeTopic = typeof knowledgeTopics[number];
export const knowledgeDescriptions: Record<KnowledgeTopic, string> = {
  overview: 'Morpheus UI knowledge index, applicability, evidence, and limitations',
  briefs: 'Plain-language UI briefs, design intent, scope, and acceptance criteria',
  architecture: 'Folder structure, framework routes, feature ownership, and shared module boundaries',
  foundations: 'Semantic colors, runtime themes, type, spacing, layout, shape, and motion',
  components: 'Page shells, buttons, modal forms, selectors, states, technical text, and badges',
  interactions: 'Accessible component composition, keyboard behavior, focus, and interaction states',
  'data-workflows': 'Async forms, remote verification, safe saves, background jobs, search, and pagination',
  recipes: 'Page, form, selector, and investigation recipes with a portable React example',
  security: 'Safe rendering, sessions and permissions, sensitive data, uploads, and browser trust boundaries',
  quality: 'Accessibility, theme and responsive checks, source defects, and adoption boundaries',
  sources: 'Source paths, snapshot provenance, conflicts, and maintenance guidance',
  tokens: 'Machine-readable source colors and layout, typography, spacing, and motion constants',
};
export const knowledgeIndex = () => knowledgeTopics.map(topic => ({
  topic,
  description: knowledgeDescriptions[topic],
  uri: `ui://knowledge/morpheus/${topic}`,
}));
export async function readKnowledge(topic: KnowledgeTopic): Promise<string> {
  if (!knowledgeTopics.includes(topic)) throw new Error('Unknown design knowledge topic.');
  const filename = topic === 'tokens' ? 'tokens.json' : `${topic}.md`;
  return readFile(new URL(`../skills/frontend-ui/references/${filename}`, import.meta.url), 'utf8');
}
export function recommendKnowledge(request: string): KnowledgeTopic[] {
  const topics: KnowledgeTopic[] = ['briefs', 'architecture', 'foundations', 'components', 'interactions'];
  if (/table|list|search|filter|paginat|query|dashboard|monitor|fetch|api|data|\bforms?\b|verif|submit|polling|\bjobs?\b/i.test(request)) topics.push('data-workflows');
  if (/\b(?:security|secure|auth\w*|sign[ -]?(?:in|out|up)|log[ -]?(?:in|out)|session\w*|cookies?|tokens?|permissions?|private|secrets?|csrf|xss|csp|cors|uploads?|redirect\w*|embeds?|iframes?|postMessage|rich[ -]?text|markdown|saniti[sz]\w*|user[ -]generated)\b/i.test(request)) {
    topics.push('security');
  }
  topics.push('recipes', 'quality');
  return topics;
}
