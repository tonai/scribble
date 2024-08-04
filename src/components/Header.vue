<script setup lang="ts">
import { playerId, playerIds } from "../store"
import Avatar from "./Avatar.vue"
</script>

<template>
  <header class="header">
    <ul className="list">
      <li v-for="id of playerIds" :class="{ you: playerId === id }" :key="id">
        <Avatar :id="id" />
      </li>
    </ul>
  </header>
</template>

<style scoped>
.header {
  background: center bottom url(/line.png) repeat-x;
}

.list {
  list-style-type: none;
  padding: 1vh 0 2vh;
  margin: 0;
  display: flex;
  justify-content: center;
  gap: 4vw;
}
</style>
