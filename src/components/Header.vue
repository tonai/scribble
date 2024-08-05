<script setup lang="ts">
import { computed } from "vue"
import { guessWord, hint, mode, playerId, playerIds } from "../store"
import Avatar from "./Avatar.vue"
import CountDown from "./CountDown.vue"
import { Mode } from "../types/logic";

const hintWord = computed(() => {
  const hintWord = guessWord.value.replaceAll(/[^\s'\.-]/ig, "_").split("")
  for (const index of hint.value) {
    hintWord[index] = guessWord.value[index]
  }
  return hintWord.join("")
})
</script>

<template>
  <header class="header">
    <ul className="list">
      <li v-for="id of playerIds" :class="{ you: playerId === id }" :key="id">
        <Avatar :id="id" />
      </li>
    </ul>
    <div v-if="mode === Mode.PLAY" class="play">
      <div class="hint">{{ hintWord }}</div>
      <CountDown />
    </div>
  </header>
</template>

<style scoped>
.header {
  padding: 0.5vh 0 2vh;
  position: relative;
  z-index: 1;
  background-color: white;
}
/*.header:before {
  content: '';
  position: absolute;
  inset: 0;
  bottom: 0.5vh;
  background-color: white;
}*/
.header:after {
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  bottom: -0.5vh;
  background: center bottom url(/line.png) repeat-x;
  height: 6px;
}
.header > * {
  position: relative;
}
.list {
  list-style-type: none;
  padding: 0;
  margin: 0;
  display: flex;
  justify-content: center;
  gap: 3vw;
}
.play {
  display: flex;
  justify-content: space-between;
  padding: 0 5vw;
  height: 3vh;
}
.hint {
  letter-spacing: 2px;
}
</style>
