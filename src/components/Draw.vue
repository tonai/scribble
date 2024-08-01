<script setup lang="ts">
import { onMounted, onUnmounted, ref, watch, watchEffect } from "vue"
import { createDrauu } from "drauu"
import { drauu, mode } from "../store"
import { Mode } from "../types/logic"

const svg = ref<SVGSVGElement>()
const interval = ref<number>()
const lastDump = ref<string>()

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
    const dump = drauuInstance.dump()
    if (dump !== lastDump.value) {
      lastDump.value = dump
      Dusk.actions.draw(dump)
    }
  }, 1000 / 8)
})

onUnmounted(() => {
  clearInterval(interval.value)
})

watch(mode, () => {
  if (mode.value === Mode.CHOOSE && drauu.value) {
    drauu.value.clear();
  }
})
</script>

<template>
  <svg
    ref="svg"
    class="svg"
    :class="{ disabled: mode !== Mode.PLAY, enabled: mode === Mode.PLAY }"
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
