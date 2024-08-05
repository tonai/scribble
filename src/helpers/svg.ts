import { AddAction, DeleteAction, UpdateAction } from "../types/logic"

export function createSvg(
  svg: SVGSVGElement,
  diffAction: AddAction | UpdateAction,
  id: string
) {
  const [, index, dump] = diffAction
  svg.innerHTML = dump
  const node = svg.children[0] as SVGElement
  node.dataset.id = id
  node.dataset.index = String(index)
  return node
}

export function removeSvg(
  svg: SVGSVGElement,
  diffAction: DeleteAction | UpdateAction,
  id: string
) {
  const [, index] = diffAction
  const item = [...svg.children].find(
    (el) =>
      el instanceof SVGElement &&
      el.dataset.id === id &&
      el.dataset.index === String(index)
  )
  item?.remove()
}
