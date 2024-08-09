import { AddAction, DeleteAction, UpdateAction } from "../types/logic"

export function createSvg(
  svg: SVGSVGElement,
  tmp: SVGSVGElement,
  diffAction: AddAction,
  nodes: SVGElement[],
  dumps: string[]
) {
  const [, , , , dump] = diffAction
  tmp.innerHTML = dump
  const item = tmp.children[0]
  if (item && item instanceof SVGElement && item.dataset.committed === "1") {
    moveSvg(svg, item as SVGElement, nodes, dumps)
  }
}

export function createAndMoveSvg(
  svg: SVGSVGElement,
  tmp: SVGSVGElement,
  diffAction: AddAction,
  nodes: SVGElement[],
  dumps: string[]
) {
  const [, , , , dump] = diffAction
  tmp.innerHTML = dump
  const item = tmp.children[0]
  if (item && item instanceof SVGElement) {
    moveSvg(svg, item as SVGElement, nodes, dumps)
  }
}

export function updateSvg(
  svg: SVGSVGElement,
  tmp: SVGSVGElement,
  diffAction: UpdateAction,
  nodes: SVGElement[],
  dumps: string[]
) {
  const [, , time, id, dump] = diffAction
  tmp.innerHTML = dump
  const item = [...tmp.children].find(
    (el) =>
      el instanceof SVGElement &&
      el.dataset.id === id &&
      el.dataset.time === time
  )
  if (item && item instanceof SVGElement && item.dataset.committed === "1") {
    moveSvg(svg, item as SVGElement, nodes, dumps)
  }
}

export function moveSvg(
  svg: SVGSVGElement,
  item: SVGElement,
  nodes: SVGElement[],
  dumps: string[]
) {
  nodes.push(item as SVGElement)
  dumps.push(item.outerHTML)
  svg.append(item)
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
