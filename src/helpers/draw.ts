import { playerId } from "../store"
import { Action, DiffAction } from "../types/logic"

export function getDiff(
  prevNodes: SVGElement[],
  lastNodes: SVGElement[],
  prevDump: string[],
  lastDump: string[]
): DiffAction[] {
  if (lastNodes.length === 0 && prevNodes.length === 0) {
    return []
  }
  const now = Date.now()
  if (lastNodes.length === 0) {
    Dusk.actions.clear(now)
    return []
  }
  const diff: DiffAction[] = []
  const all = [...new Set(prevNodes.concat(lastNodes))]
  for (const node of all) {
    const prevIndex = prevNodes.indexOf(node)
    const lastIndex = lastNodes.indexOf(node)
    // Update
    if (prevIndex === lastIndex) {
      if (prevDump[prevIndex] !== lastDump[lastIndex] && (!("id" in node.dataset) || node.dataset.id === playerId.value)) {
        diff.push([now, Action.UPDATE, lastIndex, node.dataset.time ?? '', node.outerHTML])
      }
      continue
    }
    // Deleted item
    if (lastIndex === -1) {
      diff.push([now, Action.DELETE, prevIndex, node.dataset.time ?? '', node.dataset.id ?? ''])
      continue
    }
    // New item
    if (prevIndex === -1 && (!("id" in node.dataset) || node.dataset.id === playerId.value)) {
      diff.push([now, Action.ADD, lastIndex, node.dataset.time ?? '', node.outerHTML])
      continue
    }
  }
  return diff
}
