<script setup lang="ts">
import { t } from "../helpers/i18n"
import { scores } from "../store"

function ready() {
  Dusk.actions.ready()
}
</script>

<template>
  <table>
    <tr v-for="(score, playerId) in scores" :key="playerId">
      <td>{{ playerId }}</td>
      <td>+{{ score.score }}</td>
      <td>{{ score.total }}</td>
    </tr>
  </table>
  <button type="button" @click="ready">{{ t("Ready") }}</button>
</template>
