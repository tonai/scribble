<script setup lang="ts">
import { ref } from 'vue';
import { playerId, playersGuessed } from '../store';

const guess = ref('');

function submit(event: Event) {
  event.preventDefault();
  Dusk.actions.guess(guess.value);
  guess.value = '';
}
</script>

<template>
  <form v-if="!(playerId in playersGuessed)" class="form" @submit="submit">
    <input class="input button" v-model="guess" />
    <input class="submit button" type="submit" value="Guess" />
  </form>
</template>

<style scoped>
.form {
  padding: 2vh 0 1vh;
  display:flex;
  align-items: center;
  justify-content: center;
  gap: 5vw;
  position: relative;
  font-size: 4vw;
  background-color: white;
}
/*.form:before {
  content: '';
  position: absolute;
  inset: 0;
  top: 0.5vh;
}*/
.form:after {
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  top: -0.5vh;
  background: center top url(/line.png) repeat-x;
  height: 6px;
}
.form > * {
  position: relative;
}
</style>