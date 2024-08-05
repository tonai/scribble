import { Action, DiffAction } from "../types/logic"

export function getDiff(prev: string[], last: string[]): DiffAction[] {
  if (last.length === 0 && prev.length === 0) {
    return []
  }
  if (last.length === 0) {
    return [[Action.CLEAR]]
  }
  const diff: DiffAction[] = []
  const all = [...new Set(prev.concat(last))]
  for (const item of all) {
    const prevIndex = prev.indexOf(item)
    const lastIndex = last.indexOf(item)
    // Everything is fine
    if (prevIndex === lastIndex) {
      continue
    }
    // Deleted item
    if (lastIndex === -1) {
      diff.push([Action.DELETE, prevIndex])
    }
    // New item
    if (prevIndex === -1) {
      diff.push([Action.ADD, lastIndex, item])
    }
  }
  return diff
}
