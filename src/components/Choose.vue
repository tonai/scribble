<script setup lang="ts">
import { words } from "../store"

function choose(word: string) {
  Dusk.actions.choose(word)
}
</script>

<template>
  <div class="choose">
    <button
      v-for="word of words"
      class="button"
      type="button"
      @click="choose(word)"
      :key="word"
    >
      <span>{{ word }}</span>
    </button>
  </div>
</template>

<style scoped>
.choose {
  position: absolute;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 5vh;
  font-size: 6vw;
}
</style>
