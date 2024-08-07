<script setup lang="ts">
import { computed, ref } from 'vue';
import { countDown, guessWord, hint, mode, playerId, playersGuessed, step } from '../store';
import { Mode, Step } from '../types/logic';
import { t } from '../helpers/i18n';
import CountDown from './CountDown.vue';

const guess = ref('');

const hintWord = computed(() => {
  if (playerId.value in playersGuessed.value) {
    return guessWord.value
  }
  const hintWord = guessWord.value.replaceAll(/[^\s'\.-]/gi, "_").split("")
  for (const { index, revealTime } of hint.value) {
    if (countDown.value < revealTime) {
      hintWord[index] = guessWord.value[index]
    }
  }
  return hintWord.join("")
})

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
    <div v-if="step === Step.PLAY && mode === Mode.GUESS" class="play">
      <div class="hint">{{ hintWord }}</div>
      <CountDown />
    </div>
  </div>
</template>

<style scoped>
.guess {
  padding: 1vh 2vw 2vh;
  position: relative;
  background-color: white;
  font-size: 6vw;
  text-align: center;
  z-index: 1;
}
.guess:after {
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  bottom: -3px;
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
  border-width: 6px;
  border-style: solid;
  border-image: url("/border.png") 6;
}
.submit {
  border-width: 6px;
  border-style: solid;
  border-image: url("/border.png") 6;
}
.submit:active {
  scale: 1.1;
}
.play {
  display: flex;
  justify-content: space-between;
  padding: 0 5vw;
  height: 3vh;
  font-size: 6vw;
}
.hint {
  letter-spacing: 2px;
}
</style>