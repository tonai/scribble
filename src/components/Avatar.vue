<script setup lang="ts">
import { computed } from "vue"
import { drawingPayer, mode, playersGuessed, step } from "../store"
import { Mode, Step } from "../types/logic"
import Pen from "./icon/Pen.vue"

const { id } = defineProps<{
  id: string
}>()

const player = computed(() => Rune.getPlayerInfo(id))
</script>

<template>
  <div
    class="avatar"
    :class="{
      guess:
        (step == Step.PLAY || step == Step.SCORES) &&
        id in playersGuessed &&
        id !== drawingPayer,
      noGuess:
        step == Step.SCORES && !(id in playersGuessed) && id !== drawingPayer,
    }"
  >
    <img class="image" :src="player.avatarUrl" />
    <span
      v-if="step !== Step.WAIT && id === drawingPayer && mode === Mode.GUESS"
      class="drawingPlayer"
    >
      <Pen />
    </span>
  </div>
</template>

<style scoped>
.avatar {
  position: relative;
  border: 1vw solid black;
  border-radius: 50%;
  background-color: black;
  box-sizing: border-box;
}
.guess {
  border-color: green;
  background-color: green;
}
.noGuess {
  border-color: red;
  background-color: red;
}
.image {
  display: block;
  max-width: 12vw;
  width: 100%;
}
.drawingPlayer {
  position: absolute;
  top: -2vw;
  right: -2vw;
  font-size: 3vw;
  width: 6vw;
  height: 6vw;
  border-radius: 3vw;
  background-color: var(--selected-color);
  display: flex;
  justify-content: center;
  align-items: center;
}

.drawingPlayer svg {
  width: 1em;
}
</style>
