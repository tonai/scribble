<script setup lang="ts">
import { onMounted } from "vue"
import { t } from "../helpers/i18n"
import { playSound } from "../helpers/sound"
import { gameOver, guessWord, playerId, playersReady, scores } from "../store"
import Avatar from "./Avatar.vue"

function ready(on?: boolean) {
  playSound(on ? "on" : "off")
  Rune.actions.ready()
}

onMounted(() => {
  playSound("scores")
})
</script>

<template>
  <div class="dialog scores">
    <div class="content">
      <div class="guessWord">{{ guessWord }}</div>
      <table>
        <tr v-for="(score, id) in scores" :key="id">
          <td class="cell"><Avatar :id="id" /></td>
          <td class="cell">+{{ score.score ?? 0 }}</td>
          <td class="cell total">{{ score.total }}</td>
        </tr>
      </table>
      <button
        v-if="!gameOver"
        class="button"
        :class="{ 'button--selected': playersReady.includes(playerId) }"
        type="button"
        @click="ready(!playersReady.includes(playerId))"
      >
        <span>{{ t("Ready") }}</span>
      </button>
    </div>
  </div>
</template>

<style scoped>
.scores {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 5vh;
  font-size: 6vw;
  text-align: center;
  z-index: 2;
}
.content {
  background-color: white;
  padding: 6vw;
}
.guessWord {
  font-weight: bold;
  font-size: 105%;
}
.cell {
  padding: 2vw 3vw;
}
.total {
  font-weight: bold;
}
</style>
