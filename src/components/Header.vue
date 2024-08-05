<script setup lang="ts">
import { computed } from "vue"
import {
  countDown,
  guessWord,
  hint,
  mode,
  playerId,
  playerIds,
  playersGuessed,
  step,
} from "../store"
import Avatar from "./Avatar.vue"
import CountDown from "./CountDown.vue"
import { Mode, Step } from "../types/logic"

const hintWord = computed(() => {
  if (playerId.value in playersGuessed.value) {
    return guessWord.value
  }
  const hintWord = guessWord.value.replaceAll(/[^\s'\.-]/gi, "_").split("")
  for (const { index, revealTime } of hint.value) {
    if (countDown.value < revealTime) {
      hintWord[index] = guessWord.value[index]
    }
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
    <div v-if="step === Step.PLAY && mode === Mode.GUESS" class="play">
      <div class="hint">{{ hintWord }}</div>
      <CountDown />
    </div>
  </header>
</template>

<style scoped>
.header {
  padding: 0.5vh 0 1.5vh;
  position: relative;
  z-index: 1;
  background-color: white;
}
.header:after {
  content: "";
  position: absolute;
  left: 0;
  right: 0;
  bottom: -3px;
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
  font-size: 6vw;
}
.hint {
  letter-spacing: 2px;
}
</style>
