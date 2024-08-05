<script setup lang="ts">
import { computed } from "vue"
import { drawingPayer, mode, playersGuessed, step } from "../store"
import { Mode, Step } from "../types/logic"

const { id } = defineProps<{
  id: string
}>()

const player = computed(() => Dusk.getPlayerInfo(id))
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
      class="drawingPlayer"
      v-if="step !== Step.WAIT && id === drawingPayer && mode === Mode.GUESS"
      >✏️</span
    >
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
  top: -1vw;
  right: -1vw;
  font-size: 6vw;
}
</style>
