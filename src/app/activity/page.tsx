import { ActivityPanel } from '@/components/panels/activity-panel'

export const metadata = {
  title: 'Activity',
  description: 'Kranix development activity — commits, releases, and reconciler events.',
}

export default function ActivityPage() {
  return <ActivityPanel />
}
