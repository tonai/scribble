<script setup lang="ts">
import { computed } from 'vue';
import { t } from '../helpers/i18n'
import { drawingPayer, playersGuessed } from '../store'

const alerts = computed(() => Object.keys(playersGuessed.value).filter((id) => id !== drawingPayer.value))
</script>

<template>
  <ul class="alerts">
    <li v-for="alert of alerts" :key="alert" class="alert">{{ alert }} {{ t("guessed the word") }}</li>
  </ul>
</template>

<style scoped>
.alerts {
  list-style-type: none;
  margin: 0;
  padding: 0;
  position: absolute;
  bottom: calc(14vw + 4vh);
  right: 2vw;
  text-align: right;
  font-size: 4vw;
  color: #00ff00;
  overflow: hidden;
}
.alert {
  animation: 5s linear forwards alert;
}
@keyframes alert {
  0% {
    translate: 200% 0;
  }
  4% {
    translate: 0 0;
  }
  96% {
    translate: 0 0;
  }
  100% {
    translate: 200% 0;
  }
}
</style>