<script setup lang="ts">
import { words } from "../store"

function choose(word: string) {
  Dusk.actions.choose(word)
}
</script>

<template>
  <div class="dialog choose">
    <button
      v-for="word of words"
      :key="word"
      class="button"
      type="button"
      @click="choose(word)"
    >
      <span>{{ word }}</span>
    </button>
  </div>
</template>

<style scoped>
.choose {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 5vh;
  font-size: 6vw;
  z-index: 2;
  padding: 0 10vw;
}
.button {
  padding: 2vh 4vw;
  width: 100%;
}
</style>
