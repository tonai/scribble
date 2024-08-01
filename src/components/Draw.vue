<script setup lang="ts">
import { onMounted, onUnmounted, ref } from "vue"
import { createDrauu } from "drauu"
import { drauu } from "../store"

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
  drauu.value = drauuInstance;

  interval.value = setInterval(() => {
    const dump = drauuInstance.dump();
    if (dump !== lastDump.value) {
      lastDump.value = dump;
      Dusk.actions.draw(dump);
    }
  }, 1000 / 8);
})

onUnmounted(() => {
  clearInterval(interval.value);
})
</script>

<template>
  <svg ref="svg" class="svg"></svg>
</template>

<style scoped>
.svg {
  flex: 1;
}
</style>
