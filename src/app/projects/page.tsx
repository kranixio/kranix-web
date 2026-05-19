import { ProjectsPanel } from '@/components/panels/projects-panel'

export const metadata = {
  title: 'Projects',
  description: 'Kranix platform modules — Core, MCP server, CLI, GitOps operator, and runtime drivers.',
}

export default function ProjectsPage() {
  return <ProjectsPanel />
}
