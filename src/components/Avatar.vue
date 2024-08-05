<script setup lang="ts">
import { computed } from 'vue';
import { drawingPayer, playersGuessed, mode } from "../store"
import { Mode } from '../types/logic';

const { id } = defineProps<{
  id: string
}>()

const player = computed(() => Dusk.getPlayerInfo(id));
</script>

<template>
  <div class="avatar" :class="{ guess: mode !== Mode.WAIT && id in playersGuessed && id !== drawingPayer }">
    <img
      class="image"
      :src="player.avatarUrl"
    />
    <span class="drawingPlayer" v-if="mode !== Mode.WAIT && id === drawingPayer">✏️</span>
  </div>
</template>

<style scoped>
.avatar {
  position: relative;
  border: 1vw solid black;
  border-radius: 50%;
  background-color: black;
  box-sizing: border-box;
}
.guess {
  border-color: green;
  background-color: green;
}
.image {
  display: block;
  max-width: 12vw;
  width: 100%;
}
.drawingPlayer {
  position: absolute;
  top: -1vw;
  right: -1vw;
  font-size: 6vw;
}
</style>