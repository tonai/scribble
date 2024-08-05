<script setup lang="ts">
import { format } from '../helpers/format';
import { countDown } from '../store';
</script>

<template>
  <div class="countdown">{{ format(countDown) }}</div>
</template>
