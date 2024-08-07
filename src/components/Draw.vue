<script setup lang="ts">
import { onMounted, onUnmounted, ref, watch } from "vue"
import { createDrauu } from "drauu"
import {
  drauu,
  drawDump,
  drawingPayer,
  load,
  playerId,
  lastDump,
  lastNodes,
  mode,
  svg,
  step,
  tmp,
} from "../store"
import { getDiff } from "../helpers/draw"
import { Mode, Step } from "../types/logic"

const interval = ref<number>()

onMounted(() => {
  const drauuInstance = createDrauu({
    el: svg.value,
    brush: {
      mode: "draw",
      color: "black",
      size: 6,
    },
  })
  drauu.value = drauuInstance
  let dump = Object.entries(drawDump.value)
    .reduce(
      (acc, [id, dumps]) =>
        acc.concat(
          Object.entries(dumps).map(([time, dump]) => ({
            ...dump,
            id,
            time: Number(time),
          }))
        ),
      [] as { dump: string; id: string; time: number }[]
    )
    .sort((a, b) => a.time - b.time)
  load(dump)

  interval.value = setInterval(() => {
    if (svg.value && drauu.value) {
      const nodes = [...svg.value.children].filter(
        (node) =>
          node instanceof SVGElement &&
          "id" in node.dataset &&
          "time" in node.dataset
      ) as SVGElement[]
      const dump = nodes.map((node) => node.outerHTML)
      const diff = getDiff(lastNodes.value, nodes, lastDump.value, dump)
      Dusk.actions.draw(diff)
      lastNodes.value = nodes
      lastDump.value = dump
    }
  }, 1000 / 8)
})

onUnmounted(() => {
  clearInterval(interval.value)
})

watch(step, () => {
  if (step.value === Step.CHOOSE && drauu.value) {
    drauu.value.clear()
  }
})

function start() {
  setTimeout(() => {
    // @ts-expect-error ignore
    const currentNode = drauu.value?._currentNode
    if (currentNode) {
      currentNode.dataset.time = String(Date.now())
      currentNode.dataset.id = playerId.value
    }
  })
}

function committed(node?: SVGElement) {
  if (node && svg.value && mode.value === Mode.FREE) {
    svg.value.append(node)
  }
}

onMounted(() => {
  if (drauu.value) {
    drauu.value.on("start", start)
    drauu.value.on("committed", committed)
  }
})
</script>

<template>
  <div class="draw">
    <div class="container">
      <svg ref="tmp" class="svg hidden"></svg>
      <svg
        ref="svg"
        class="svg"
        :class="{
          disabled:
            step !== Step.PLAY ||
            (drawingPayer !== playerId && mode === Mode.GUESS),
          enabled:
            step === Step.PLAY &&
            (drawingPayer === playerId || mode === Mode.FREE),
        }"
        viewBox="0 0 300 400"
      ></svg>
    </div>
  </div>
</template>

<style scoped>
.draw {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}
.container {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}
.svg {
  aspect-ratio: 3/4;
  background-color: white;
  max-width: 100%;
  max-height: 100%;
  position: absolute;
}
.hidden {
  z-index: -1;
}
.enabled {
  touch-action: none;
}
.disabled {
  pointer-events: none;
}
</style>
