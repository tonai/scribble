import { AddAction, DeleteAction, UpdateAction } from "../types/logic"

export function createSvg(
  svg: SVGSVGElement,
  tmp: SVGSVGElement,
  diffAction: AddAction | UpdateAction,
  nodes: SVGElement[],
  dumps: string[]
) {
  const [, , , , dump] = diffAction
  tmp.innerHTML = dump
  const node = tmp.children[0] as SVGElement
  nodes.push(node)
  dumps.push(node.outerHTML)
  svg.append(node)
}

export function updateSvg(
  svg: SVGSVGElement,
  tmp: SVGSVGElement,
  diffAction: UpdateAction,
  nodes: SVGElement[],
  dumps: string[]
) {
  const [, , time, id, dump] = diffAction
  const item = [...svg.children].find(
    (el) =>
      el instanceof SVGElement &&
      el.dataset.id === id &&
      el.dataset.time === time
  )
  if (item) {
    const index = nodes.indexOf(item as SVGElement)
    tmp.innerHTML = dump
    const node = tmp.children[0] as SVGElement
    for (const attribute of node.attributes) {
      item.setAttribute(attribute.name, attribute.value)
    }
    node.remove();
    dumps[index] = dump;
  }
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
