<script setup lang="ts">
import { t } from "../helpers/i18n"
import { playerId, playersReady, scores } from "../store"
import Avatar from "./Avatar.vue"

function ready() {
  Dusk.actions.ready()
}
</script>

<template>
  <div class="scores">
    <div class="dialog">
      <table>
        <tr v-for="(score, playerId) in scores" :key="playerId">
          <td class="cell"><Avatar :id="playerId" /></td>
          <td class="cell">+{{ score.score }}</td>
          <td class="cell total">{{ score.total }}</td>
        </tr>
      </table>
      <button
        class="button"
        :class="{ 'button--selected': playersReady.includes(playerId) }"
        type="button"
        @click="ready"
      >
        <span>{{ t("Ready") }}</span>
      </button>
    </div>
  </div>
</template>

<style scoped>
.scores {
  position: absolute;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 5vh;
  font-size: 6vw;
  text-align: center;
  z-index: 2;
}
.dialog {
  background-color: white;
  padding: 6vw 2vw;
}
.cell {
  padding: 3vw;
}
.total {
  font-weight: bold;
}
</style>
