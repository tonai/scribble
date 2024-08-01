<script setup lang="ts">
import { scores } from '../store';

function ready() {
  Dusk.actions.ready();
}
</script>

<template>
  <table>
    <tr v-for="(score, playerId) in scores">
      <td>{{ playerId }}</td>
      <td>+{{ score.score }}</td>
      <td>{{ score.total }}</td>
    </tr>
  </table>
  <button type="button" @click="ready">Ready</button>
</template>