/** Simulated live control-plane metrics for the overview dashboard */

export interface PlatformMetrics {
  workloads: number
  reconcilesPerMin: number
  mcpAgents: number
  eventRate: number
}

export function getInitialMetrics(): PlatformMetrics {
  return {
    workloads: 24,
    reconcilesPerMin: 142,
    mcpAgents: 3,
    eventRate: 28,
  }
}

export function tickMetrics(prev: PlatformMetrics): PlatformMetrics {
  return {
    workloads: clamp(prev.workloads + rand(-1, 2), 18, 48),
    reconcilesPerMin: clamp(prev.reconcilesPerMin + rand(-8, 12), 80, 220),
    mcpAgents: clamp(prev.mcpAgents + (Math.random() > 0.92 ? 1 : 0), 1, 8),
    eventRate: clamp(prev.eventRate + rand(-3, 5), 12, 64),
  }
}

function rand(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

function clamp(n: number, min: number, max: number) {
  return Math.min(max, Math.max(min, n))
}
