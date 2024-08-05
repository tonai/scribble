<script setup lang="ts">
import { onMounted } from "vue"
import {
  countDown,
  drauu,
  drawingPayer,
  dump,
  guessWord,
  hint,
  language,
  mode,
  playerId,
  playerIds,
  playersGuessed,
  playersLanguage,
  playersReady,
  scores,
  words,
} from "../store"
import { Mode } from "../types/logic"
import Choose from "./Choose.vue"
import Draw from "./Draw.vue"
import DrawControls from "./DrawControls.vue"
import Guess from "./Guess.vue"
import Header from "./Header.vue"
import Scores from "./Scores.vue"
import StartScreen from "./StartScreen.vue"

onMounted(() => {
  Dusk.initClient({
    onChange: ({ game, yourPlayerId }) => {
      if (yourPlayerId && playerId.value !== yourPlayerId) {
        playerId.value = yourPlayerId
      }
      if (playerIds.value !== game.playerIds) {
        playerIds.value = game.playerIds
      }
      if (playersGuessed.value !== game.playersGuessed) {
        playersGuessed.value = game.playersGuessed
      }
      if (playersLanguage.value !== game.playersLanguage) {
        playersLanguage.value = game.playersLanguage
      }
      if (playersReady.value !== game.playersReady) {
        playersReady.value = game.playersReady
      }
      if (countDown.value !== game.countDown) {
        countDown.value = game.countDown
      }
      if (drawingPayer.value !== game.drawingPayer) {
        drawingPayer.value = game.drawingPayer
      }
      if (guessWord.value !== game.guessWord) {
        guessWord.value = game.guessWord
      }
      if (hint.value !== game.hint) {
        hint.value = game.hint
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
      const gameDump = game.dump.join();
      if (game.drawingPayer !== yourPlayerId && dump.value !== gameDump) {
        dump.value = gameDump
        if (drauu.value) {
          drauu.value.load(gameDump)
        }
      }
    },
  })
})
</script>

<template>
  <div class="app" :class="Mode[mode]">
    <Header />
    <StartScreen v-if="mode === Mode.WAIT" />
    <div v-else class="container">
      <Draw />
      <DrawControls v-if="drawingPayer === playerId" />
      <Choose v-if="drawingPayer === playerId && mode === Mode.CHOOSE" />
      <Guess v-if="drawingPayer !== playerId && mode === Mode.PLAY" />
    </div>
    <Scores v-if="mode === Mode.SCORES" />
  </div>
</template>

<style scoped>
.app {
  flex: 1;
  display: flex;
  flex-direction: column;
}
.container {
  display: flex;
  height: 100%;
  flex-direction: column;
}
</style>
