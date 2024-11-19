<script setup lang="ts">
import { isDrawing, mode, playerId, playerIds } from "../store"

import { Mode } from "../types/logic"
import { t } from "../helpers/i18n"
import { playSound } from "../helpers/sound"

import Avatar from "./Avatar.vue"

function back() {
  playSound("button")
  Rune.actions.back()
}
</script>

<template>
  <header class="header">
    <ul className="list">
      <li class="item">
        <button
          v-if="mode === Mode.FREE"
          :disabled="isDrawing"
          class="button"
          type="button"
          @click="back"
        >
          <span>{{ t("Back") }}</span>
        </button>
      </li>
      <li v-for="id of playerIds" :key="id" :class="{ you: playerId === id }">
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
  background: center bottom url(/img/line.png) repeat-x;
  height: 6px;
}
.header > * {
  position: relative;
}
.list {
  list-style-type: none;
  padding: 0 2vw;
  margin: 0;
  display: flex;
  justify-content: center;
  gap: 3vw;
}
.item {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
