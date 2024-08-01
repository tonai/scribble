<script setup lang="ts">
function ready() {
  Dusk.actions.ready();
}
</script>

<template>
  <button type="button" @click="ready">Ready</button>
</template>