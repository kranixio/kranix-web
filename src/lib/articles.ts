export interface Article {
  id: string
  title: string
  excerpt: string
  date: string
  readTime: string
  tags: string[]
  category: string
}

export const ARTICLES: Article[] = [
  { id: 'art-1', title: 'What is Kranix?', excerpt: 'An open-source, AI-native control plane for Docker and Kubernetes — one interface for humans and AI agents.', date: '2026-05-12', readTime: '6 min', tags: ['platform', 'overview'], category: 'Platform' },
  { id: 'art-2', title: 'Connecting an AI Agent via MCP', excerpt: 'Start kranix-mcp, add it to Claude Desktop, and deploy workloads with natural language.', date: '2026-05-10', readTime: '8 min', tags: ['MCP', 'AI agents'], category: 'Guides' },
  { id: 'art-3', title: 'GitOps with KranixApp CRDs', excerpt: 'Commit a manifest to Git — the operator reconciles it. No manual kubectl apply.', date: '2026-05-08', readTime: '10 min', tags: ['GitOps', 'Kubernetes'], category: 'GitOps' },
  { id: 'art-4', title: 'Multi-Backend Deploy in One Command', excerpt: 'kranix deploy works against Docker locally, a kind cluster, or production Kubernetes.', date: '2026-04-28', readTime: '7 min', tags: ['CLI', 'runtime'], category: 'Guides' },
  { id: 'art-5', title: 'AI-Powered Debugging with kranix analyze', excerpt: 'Reason over crash logs, resource bottlenecks, and failing dependencies — with generated patches.', date: '2026-04-15', readTime: '9 min', tags: ['AI', 'debugging'], category: 'Platform' },
]
