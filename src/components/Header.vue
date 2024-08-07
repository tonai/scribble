<script setup lang="ts">
import {
  playerId,
  playerIds,
} from "../store"
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
  padding: 1.5vh 0 0.5vh;
  position: relative;
  z-index: 1;
  background-color: white;
}
.header:after {
  content: "";
  position: absolute;
  left: 0;
  right: 0;
  top: -3px;
  background: center bottom url(/line.png) repeat-x;
  height: 6px;
}
.header > * {
  position: relative;
}
.list {
  list-style-type: none;
  padding: 0;
  margin: 0;
  display: flex;
  justify-content: center;
  gap: 3vw;
}
</style>
