<script setup lang="ts">
import { onMounted, onUnmounted, ref, watch } from "vue"
import { createDrauu } from "drauu"
import { drauu, drawingPayer, mode, playerId } from "../store"
import { getDiff } from "../helpers/draw"
import { Mode } from "../types/logic"

const svg = ref<SVGSVGElement>()
const interval = ref<number>()
const lastDump = ref<string[]>([])

onMounted(() => {
  const drauuInstance = createDrauu({
    el: svg.value,
    brush: {
      mode: "stylus",
      color: "black",
      size: 3,
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
</script>

<template>
  <svg
    ref="svg"
    class="svg"
    :class="{
      disabled: mode !== Mode.PLAY || drawingPayer !== playerId,
      enabled: mode === Mode.PLAY && drawingPayer === playerId,
    }"
  ></svg>
</template>

<style scoped>
.svg {
  flex: 1;
}
.enabled {
  touch-action: none;
}
.disabled {
  pointer-events: none;
}
</style>
