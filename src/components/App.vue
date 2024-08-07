<script setup lang="ts">
import { onMounted } from "vue"
import {
  countDown,
  drawingPayer,
  draw,
  drawDump,
  gameOver,
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
  selectedModes,
  step,
  words,
} from "../store"
import { initSounds, playSound } from "../helpers/sound"
import { Mode, Step } from "../types/logic"
import Choose from "./Choose.vue"
import Draw from "./Draw.vue"
import DrawControls from "./DrawControls.vue"
import Guess from "./Guess.vue"
import Header from "./Header.vue"
import Scores from "./Scores.vue"
import StartScreen from "./StartScreen.vue"

onMounted(() => {
  initSounds({
    guess: 'sound/Collect_All_Coins_Xylophone.ogg',
    on: "sound/Scribble-Swipe-03.mp3",
    off: "sound/Scribble-Swipe-02.mp3",
    scores: "sound/Collect_Coin_Xylophone_01.ogg",
    start: ["sound/Scribble-06.mp3", "sound/Scribble-09.mp3"],
  })
})

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
      if (drawDump.value !== game.drawDump) {
        drawDump.value = game.drawDump
      }
      if (drawingPayer.value !== game.drawingPayer) {
        drawingPayer.value = game.drawingPayer
      }
      if (gameOver.value !== game.gameOver) {
        gameOver.value = game.gameOver
      }
      if (guessWord.value !== game.guessWord) {
        guessWord.value = game.guessWord
      }
      if (hint.value !== game.hint) {
        hint.value = game.hint
      }
      if (mode.value !== game.mode) {
        mode.value = game.mode
      }
      if (language.value !== game.language) {
        language.value = game.language
      }
      if (selectedModes.value !== game.selectedModes) {
        selectedModes.value = game.selectedModes
      }
      if (step.value !== game.step) {
        if (game.step === Step.PLAY) {
          playSound("start")
        }
        step.value = game.step
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
      draw(game.drawDiff)
    },
  })
})
</script>

<template>
  <div class="app" :class="Step[step]">
    <StartScreen v-if="step === Step.WAIT" />
    <div v-else class="container">
      <Guess v-if="drawingPayer !== playerId && mode === Mode.GUESS" />
      <DrawControls v-if="drawingPayer === playerId || mode === Mode.FREE" />
      <Draw />
      <Choose v-if="drawingPayer === playerId && step === Step.CHOOSE" />
    </div>
    <Header />
    <Scores v-if="step === Step.SCORES" />
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
