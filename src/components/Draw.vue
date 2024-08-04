<script setup lang="ts">
import { onMounted, onUnmounted, ref, watch } from "vue"
import { createDrauu } from "drauu"
import { drauu, drawingPayer, mode, playerId } from "../store"
import { getDiff } from "../helpers/draw"
import { Mode } from "../types/logic"

const svg = ref<SVGSVGElement>()
const interval = ref<number>()
const lastDump = ref<string[]>([])

onMounted(() => {})

onMounted(() => {
  const drauuInstance = createDrauu({
    el: svg.value,
    brush: {
      mode: "draw",
      color: "black",
      size: 5,
    },
  })
  drauu.value = drauuInstance

  interval.value = setInterval(() => {
    if (svg.value && drauu.value) {
      const dump = [...svg.value.children].map((node) => node.outerHTML)
      const diff = getDiff(lastDump.value, dump)
      if (diff.length > 0) {
        Dusk.actions.draw(diff)
        lastDump.value = dump
      }
    }
  }, 1000 / 8)
})

onUnmounted(() => {
  clearInterval(interval.value)
})

watch(mode, () => {
  if (mode.value === Mode.CHOOSE && drauu.value) {
    drauu.value.clear()
  }
})

function resize() {
  console.log("resize")
}
</script>

<template>
  <div class="draw">
    <div class="container">
      <svg
        ref="svg"
        class="svg"
        :class="{
          disabled: mode !== Mode.PLAY || drawingPayer !== playerId,
          enabled: mode === Mode.PLAY && drawingPayer === playerId,
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
  margin: -0.5vh 0;
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
}
.enabled {
  touch-action: none;
}
.disabled {
  pointer-events: none;
}
</style>
