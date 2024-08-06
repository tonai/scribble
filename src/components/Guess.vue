<script setup lang="ts">
import { ref } from 'vue';
import { playerId, playersGuessed, step } from '../store';
import { Step } from '../types/logic';
import { t } from '../helpers/i18n';

const guess = ref('');

function submit(event: Event) {
  event.preventDefault();
  Dusk.actions.guess(guess.value);
  guess.value = '';
}
</script>

<template>
  <div class="guess">
    <form v-if="step === Step.PLAY && !(playerId in playersGuessed)" class="form" @submit="submit">
      <input class="input button" v-model="guess" />
      <input class="submit button" type="submit" value="Guess" />
    </form>
    <div v-if="step === Step.CHOOSE">{{ t('Waiting...') }}</div>
  </div>
</template>

<style scoped>
.guess {
  padding: 2vh 2vw 1vh;
  position: relative;
  background-color: white;
  font-size: 6vw;
}
.guess:after {
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  top: -3px;
  background: center top url(/line.png) repeat-x;
  height: 6px;
}
.form {
  display:flex;
  align-items: center;
  justify-content: center;
  gap: 2vw;
}
.input {
  flex: 1;
  width: 100%;
}
</style>