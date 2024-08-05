import { Action, DiffAction } from "../types/logic"

function addToMap<K, V>(map: Map<K, V[]>, key: K, value: V) {
  const item = map.get(key)
  if (item) {
    item.push(value)
  } else {
    map.set(key, [value])
  }
}

export function getDiff(prev: string[], last: string[]): DiffAction[] {
  if (last.length === 0 && prev.length === 0) {
    return []
  }
  if (last.length === 0) {
    return [[Action.CLEAR]]
  }
  const diff: Map<number, DiffAction[]> = new Map()
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
      addToMap(diff, prevIndex, [Action.DELETE, prevIndex])
    }
    // New item
    if (prevIndex === -1) {
      addToMap(diff, lastIndex, [Action.ADD, lastIndex, item])
    }
  }
  const diffActions: DiffAction[] = []
  for (const actions of diff.values()) {
    const deleteIndex = actions[0][0] === Action.DELETE ? 0 : 1
    const addIndex = actions[0][0] === Action.ADD ? 0 : 1
    if (
      actions.length === 2 &&
      actions[deleteIndex][0] === Action.DELETE &&
      actions[addIndex][0] === Action.ADD
    ) {
      const updateAction = [...actions[addIndex]]
      updateAction[0] = Action.UPDATE
      diffActions.push(updateAction as DiffAction)
    } else {
      for (const action of actions) {
        diffActions.push(action)
      }
    }
  }
  return diffActions
}
