import { AddAction, DeleteAction, UpdateAction } from "../types/logic"

export function createSvg(
  svg: SVGSVGElement,
  diffAction: AddAction | UpdateAction,
  nodes: SVGElement[],
  dumps: string[]
) {
  const [, , , , dump] = diffAction
  svg.innerHTML = dump
  const node = svg.children[0] as SVGElement
  nodes.push(node)
  dumps.push(node.outerHTML)
  return node
}

export function updateSvg(
  svg: SVGSVGElement,
  tmp: SVGSVGElement,
  diffAction: UpdateAction,
  nodes: SVGElement[],
  dumps: string[]
) {
  const node = createSvg(tmp, diffAction, nodes, dumps)
  const [, , time, id] = diffAction
  const item = [...svg.children].find(
    (el) =>
      el instanceof SVGElement &&
      el.dataset.id === id &&
      el.dataset.time === time
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
  const [, , time, id] = diffAction
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
