<script setup lang="ts">
import { ref } from 'vue';

const guess = ref('');

function submit(event: Event) {
  event.preventDefault();
  Dusk.actions.guess(guess.value);
  guess.value = '';
}
</script>

<template>
  <form @submit="submit">
    <input v-model="guess" />
    <input type="submit" value="Guess" />
  </form>
</template>