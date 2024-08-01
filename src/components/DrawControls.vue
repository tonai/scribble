<script setup lang="ts">
import { ref } from "vue"
import { DrawingMode } from "drauu"
import { drauu } from "../store"

const activeBrush = ref<DrawingMode>("stylus")
const activeColor = ref<string>("#000000")
const activeSize = ref<number>(3)

function undo() {
  drauu.value?.undo()
}

function redo() {
  drauu.value?.redo()
}

function clear() {
  drauu.value?.clear()
}

function brush(mode: DrawingMode, arrowEnd: boolean = false) {
  activeBrush.value = mode
  if (drauu.value) {
    drauu.value.mode = mode
    drauu.value.brush.arrowEnd = arrowEnd
  }
}

function color(color: string) {
  activeColor.value = color
  if (drauu.value) {
    drauu.value.brush.color = color
  }
}

function size(event: Event) {
  const size = Number((event.target as HTMLInputElement).value)
  activeSize.value = size
  if (drauu.value) {
    drauu.value.brush.size = size
  }
}
</script>

<template>
  <div>
    <button aria-label="Undo" title="Undo" @click="undo">↩️</button>
    <button aria-label="Redo" title="Redo" @click="redo">↪️</button>
    <button aria-label="Clear" title="Clear" @click="clear">🗑</button>
    <button
      :class="{ active: activeBrush === 'stylus' }"
      aria-label="Stylus"
      title="Stylus"
      @click="brush('stylus')"
    >
      ✍️
    </button>
    <button
      :class="{ active: activeBrush === 'draw' }"
      aria-label="Draw"
      title="Draw"
      @click="brush('draw')"
    >
      ✏️
    </button>
    <button
      :class="{ active: activeBrush === 'line' }"
      aria-label="Line"
      title="Line"
      @click="brush('line')"
    >
      ⁄
    </button>
    <button
      :class="{ active: activeBrush === 'line' }"
      aria-label="Arrow"
      title="Arrow"
      @click="brush('line', true)"
    >
      ↗
    </button>
    <button
      :class="{ active: activeBrush === 'rectangle' }"
      aria-label="Rect"
      title="Rect"
      @click="brush('rectangle')"
    >
      □
    </button>
    <button
      :class="{ active: activeBrush === 'ellipse' }"
      aria-label="Ellipse"
      title="Ellipse"
      @click="brush('ellipse')"
    >
      ○
    </button>
    <button
      :class="{ active: activeBrush === 'eraseLine' }"
      aria-label="Eraser"
      title="Eraser"
      @click="brush('eraseLine')"
    >
      🧹
    </button>
    <button
      :class="{ active: activeColor === '#000000' }"
      aria-label="Black"
      title="Black"
      @click="color('#000000')"
    >
      ​⚫️​
    </button>
    <button
      :class="{ active: activeColor === '#ed153d' }"
      aria-label="Red"
      title="Red"
      @click="color('#ed153d')"
    >
      ​🔴​
    </button>
    <button
      :class="{ active: activeColor === '#ed9a26' }"
      aria-label="Orange"
      title="Orange"
      @click="color('#ed9a26')"
    >
      ​🟠​​
    </button>
    <button
      :class="{ active: activeColor === '#ede215' }"
      aria-label="Yellow"
      title="Yellow"
      @click="color('#ede215')"
    >
      ​​🟡​​
    </button>
    <button
      :class="{ active: activeColor === '#30bd20' }"
      aria-label="Green"
      title="Green"
      @click="color('#30bd20')"
    >
      ​🟢​​
    </button>
    <button
      :class="{ active: activeColor === '#2656bf' }"
      aria-label="Blue"
      title="Blue"
      @click="color('#2656bf')"
    >
      ​​🔵​​
    </button>
    <button
      :class="{ active: activeColor === '#c24aed' }"
      aria-label="Purple"
      title="Purple"
      @click="color('#c24aed')"
    >
      ​🟣​​
    </button>
    <button
      :class="{ active: activeColor === '#bf6b26' }"
      aria-label="Brown"
      title="Brown"
      @click="color('#bf6b26')"
    >
      ​​🟤​
    </button>
    <input
      type="range"
      min="1"
      max="10"
      step="1"
      name="Size"
      title="Size"
      :value="activeSize"
      @input="size"
    />
    <!-- <button id="l-solid" class="active" aria-label="Solid" title="Solid">
      —
    </button>
    <button id="l-dashed" aria-label="Dashed" title="Dashed">┅</button>
    <button id="l-dotted" aria-label="Dotted" title="Dotted">⋯</button> -->
  </div>
</template>

<style scoped></style>
