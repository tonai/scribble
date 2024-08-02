<script setup lang="ts">
import { onMounted } from "vue"
import {
  countDown,
  drauu,
  drawingPayer,
  dump,
  language,
  mode,
  playerId,
  scores,
  words,
} from "../store"
import { Mode } from "../types/logic"
import Choose from "./Choose.vue"
import CountDown from "./CountDown.vue"
import Draw from "./Draw.vue"
import DrawControls from "./DrawControls.vue"
import Guess from "./Guess.vue"
import Scores from "./Scores.vue"
import StartScreen from "./StartScreen.vue"

onMounted(() => {
  Dusk.initClient({
    onChange: ({ game, yourPlayerId }) => {
      if (yourPlayerId && playerId.value !== yourPlayerId) {
        playerId.value = yourPlayerId
      }
      if (drawingPayer.value !== game.drawingPayer) {
        drawingPayer.value = game.drawingPayer
      }
      if (countDown.value !== game.countDown) {
        countDown.value = game.countDown
      }
      if (language.value !== game.language) {
        language.value = game.language
      }
      if (mode.value !== game.mode) {
        mode.value = game.mode
      }
      if (game.drawingPayer === yourPlayerId && words.value !== game.words) {
        words.value = game.words
      }
      scores.value = Object.fromEntries(
        Object.entries(game.scores)
          .filter(([id]) => game.playerIds.indexOf(id) !== -1)
          .sort(([_a, a], [_b, b]) => b - a)
          .map(([id, total]) => [id, { score: game.playersGuessed[id], total }])
      )
      if (game.drawingPayer !== yourPlayerId && dump.value !== game.dump) {
        dump.value = game.dump
        if (drauu.value) {
          drauu.value.load(game.dump)
        }
      }
    },
  })
})
</script>

<template>
  <StartScreen v-if="mode === Mode.WAIT" />
  <div v-else class="container">
    <Draw />
    <CountDown />
    <DrawControls v-if="drawingPayer === playerId" />
    <Choose v-if="drawingPayer === playerId && mode === Mode.CHOOSE" />
    <Guess v-if="drawingPayer !== playerId && mode === Mode.PLAY" />
    <Scores v-if="mode === Mode.SCORES" />
  </div>
</template>

<style scoped>
.container {
  display: flex;
  height: 100%;
  flex-direction: column;
}
</style>
