<script setup lang="ts">
import { computed } from 'vue';

const { id } = defineProps<{
  id: string
}>()

const player = computed(() => Dusk.getPlayerInfo(id));
</script>

<template>
  <img
    class="image"
    :src="player.avatarUrl"
  />
</template>

<style scoped>
.image {
  display: block;
  max-width: 13vw;
}
</style>