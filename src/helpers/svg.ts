import { AddAction, DeleteAction, UpdateAction } from "../types/logic"

export function createSvg(
  svg: SVGSVGElement,
  diffAction: AddAction | UpdateAction,
  id: string,
  nodes: SVGElement[],
  dumps: string[]
) {
  const [, , index, , dump] = diffAction
  svg.innerHTML = dump
  const node = svg.children[0] as SVGElement
  node.dataset.id = id
  node.dataset.index = String(index)
  nodes.push(node)
  dumps.push(node.outerHTML)
  return node
}

export function updateSvg(
  svg: SVGSVGElement,
  tmp: SVGSVGElement,
  diffAction: UpdateAction,
  id: string,
  nodes: SVGElement[],
  dumps: string[]
) {
  const node = createSvg(tmp, diffAction, id, nodes, dumps)
  const [, , index] = diffAction
  const item = [...svg.children].find(
    (el) =>
      el instanceof SVGElement &&
      el.dataset.id === id &&
      el.dataset.index === String(index) &&
      el.dataset.time === undefined
  )
  if (item) {
    const index = nodes.indexOf(item as SVGElement)
    nodes.splice(index, 1)
    dumps.splice(index, 1)
    item.remove()
  }
  return node
}

export function removeSvg(
  svg: SVGSVGElement,
  diffAction: DeleteAction,
  nodes: SVGElement[],
  dumps: string[]
) {
  const [, , , time, id] = diffAction
  const item = [...svg.children].find((el) => {
    return (
      el instanceof SVGElement &&
      el.dataset.id === id &&
      el.dataset.time === time
    )
  })
  if (item) {
    const index = nodes.indexOf(item as SVGElement)
    nodes.splice(index, 1)
    dumps.splice(index, 1)
    item.remove()
  }
}
