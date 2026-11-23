import { readFile } from 'node:fs/promises';

// The closed topic map also prevents resource/tool input from selecting arbitrary files.
export const knowledgeTopics = [
  'overview', 'briefs', 'architecture', 'web-platform', 'typescript', 'react-nextjs',
  'foundations', 'css-design-systems', 'components', 'interactions', 'accessibility',
  'internationalization', 'data-workflows', 'state-and-network', 'recipes',
  'security', 'performance', 'seo-content', 'quality', 'testing',
  'build-and-delivery', 'observability', 'commit-messages', 'sources', 'tokens',
] as const;
export type KnowledgeTopic = typeof knowledgeTopics[number];
export const knowledgeDescriptions: Record<KnowledgeTopic, string> = {
  overview: 'Morpheus UI knowledge index, applicability, evidence, and limitations',
  briefs: 'Plain-language UI briefs, design intent, scope, and acceptance criteria',
  architecture: 'Folder structure, framework routes, feature ownership, and shared module boundaries',
  'web-platform': 'HTML semantics, browser APIs, navigation, compatibility, storage, and offline behavior',
  typescript: 'TypeScript modeling, runtime validation, and API contracts',
  'react-nextjs': 'React state and data fetching, and Next.js routing, server and client boundaries, and caching',
  foundations: 'Semantic colors, runtime themes, type, spacing, layout, shape, and motion',
  'css-design-systems': 'CSS cascade, layout, responsive styles, shared tokens, and component variants',
  components: 'Page shells, buttons, modal forms, selectors, states, technical text, and badges',
  interactions: 'Accessible component composition, keyboard behavior, focus, and interaction states',
  accessibility: 'Semantic structure, keyboard and assistive technology, and accessible UI review',
  internationalization: 'Translations, locale-aware formatting, long text, and right-to-left layouts',
  'data-workflows': 'Async forms, remote verification, safe saves, background jobs, search, and pagination',
  'state-and-network': 'State ownership, requests, caching, retries, optimistic updates, and recovery',
  recipes: 'Page, form, selector, and investigation recipes with a portable React example',
  security: 'Safe rendering, sessions and permissions, sensitive data, uploads, and browser trust boundaries',
  performance: 'Diagnose slow loads and interactions, profile React renders, and measure improvements',
  'seo-content': 'Public routes, indexability, metadata, canonical URLs, and structured data',
  quality: 'Accessibility, theme and responsive checks, source defects, and adoption boundaries',
  testing: 'Choose unit, component, or browser tests for observable frontend behavior',
  'build-and-delivery': 'Dependencies, build configuration, CI, deployment, release safety, and rollbacks',
  observability: 'Production diagnostics, analytics, performance signals, and data minimization',
  'commit-messages': 'Repository conventions, clear Git commit subjects and bodies, and Conventional Commits examples',
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

const engineeringTopicSignals: [KnowledgeTopic, RegExp][] = [
  ['web-platform', /\b(?:web platform|browser APIs?|browser compatibility|progressive enhancement|pwa|offline|service workers?|web workers?|indexeddb|localstorage|history api|geolocation|clipboard|event (?:loop|delegation|propagation)|dom events?)\b/i],
  ['typescript', /\b(?:typescript|type[ -]?safe\w*|discriminated unions?|runtime validation|api contracts?|schema validation|type guards?)\b/i],
  ['css-design-systems', /\b(?:css|stylesheets?|design systems?|design tokens?|theming|responsive layout|container quer\w*|grid layout|flexbox|tailwind)\b/i],
  ['accessibility', /\b(?:accessib\w*|a11y|wcag|aria|keyboard|screen readers?|focus management|contrast|reduced motion)\b/i],
  ['state-and-network', /\b(?:state management|global state|server state|api client|network\w*|query keys?|cach\w*|retr(?:y|ies)|optimistic updates?|idempoten\w*)\b/i],
  ['seo-content', /\b(?:seo|indexability|indexable|canonical URLs?|metadata|structured data|sitemaps?|robots\.txt|open graph)\b/i],
  ['build-and-delivery', /\b(?:ci|ci\/cd|cd pipeline|build pipeline|production builds?|build config\w*|deploy\w*|release\w*|rollbacks?|lockfiles?|feature flags?|supply chain)\b/i],
  ['observability', /\b(?:observab\w*|telemetry|analytics|instrument\w*|error reporting|production monitoring|real[ -]user monitoring|privacy|redaction|consent)\b/i],
];

export function recommendKnowledge(request: string): KnowledgeTopic[] {
  const topics: KnowledgeTopic[] = ['briefs', 'architecture', 'foundations', 'components', 'interactions'];
  for (const [topic, signal] of engineeringTopicSignals) {
    if (signal.test(request)) topics.push(topic);
  }
  if (/\b(?:react|next(?:[ .-]?js)|app router|pages router|hydration|(?:server|client) components?)\b/i.test(request)) {
    topics.push('react-nextjs');
  }
  if (/\b(?:i18n|l10n|internationali[sz]\w*|locali[sz]\w*|locales?|translations?|multilingual|rtl|right[ -]to[ -]left|pluralization|currency formatting)\b/i.test(request)) {
    topics.push('internationalization');
  }
  if (/table|list|search|filter|paginat|query|dashboard|monitor|fetch|api|data|\bforms?\b|verif|submit|polling|\bjobs?\b/i.test(request)) topics.push('data-workflows');
  if (/\b(?:security|secure|auth\w*|sign[ -]?(?:in|out|up)|log[ -]?(?:in|out)|session\w*|cookies?|tokens?|permissions?|private|secrets?|csrf|xss|csp|cors|uploads?|redirect\w*|embeds?|iframes?|postMessage|rich[ -]?text|markdown|saniti[sz]\w*|user[ -]generated)\b/i.test(request)) {
    topics.push('security');
  }
  if (/\b(?:performance|slow\w*|laggy|latency|sluggish|jank\w*|lighthouse|web vitals|lcp|inp|cls|layout shifts?|bundle size|code[ -]splitting|lazy[ -]load\w*|virtuali[sz]\w*|large (?:lists?|tables?|datasets?)|heavy (?:assets?|images?|bundles?)|re[ -]?render\w*|memoization|react (?:compiler|profiler)|useDeferredValue|useTransition)\b/i.test(request)) {
    topics.push('performance');
  }
  topics.push('recipes', 'quality');
  if (/\b(?:tests?|testing|regression\w*|playwright|cypress|vitest|jest|e2e|end[ -]to[ -]end)\b/i.test(request)) {
    topics.push('testing');
  }
  if (/\b(?:commit(?:s|ting)?|commitlint|conventional commits)\b/i.test(request)) {
    topics.push('commit-messages');
  }
  return topics;
}
