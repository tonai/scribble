<script setup lang="ts">
import { countDown } from '../store';
</script>

<template>
  <div class="countdown">{{ countDown }}</div>
</template>

<style scoped>
.countdown {
  position: absolute;
  top: 0;
  left: 50%;
  translate: -50% 0;
}
</style>