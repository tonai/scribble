<script setup lang="ts">
import { computed, onMounted, type Component } from "vue"
import logo from "../assets/logo.png"
import { languages } from "../constants/game"
import { t } from "../helpers/i18n"
import {
  lastDump,
  lastNodes,
  playerId,
  playerIds,
  playersLanguage,
  selectedModes,
} from "../store"
import { Language, Mode } from "../types/logic"
import Cn from "./icon/Cn.vue"
import Es from "./icon/Es.vue"
import Fr from "./icon/Fr.vue"
import Pt from "./icon/Pt.vue"
import Ru from "./icon/Ru.vue"
import Uk from "./icon/Uk.vue"
import Avatar from "./Avatar.vue"
import { playSound } from "../helpers/sound"

const flags: Record<Language, Component> = {
  cn: Cn,
  en: Uk,
  es: Es,
  fr: Fr,
  pt: Pt,
  ru: Ru,
}

const playersByLanguage = computed(() =>
  playersLanguage.value.reduce(
    (acc, { id, language }) => {
      acc[language] = (acc[language] ?? []).concat(id)
      return acc
    },
    {} as Record<Language, string[]>
  )
)

const selectedFreeMode = computed(() =>
  Object.entries(selectedModes.value)
    .filter(([, mode]) => mode === Mode.FREE)
    .map(([id]) => id)
)
const selectedGuessMode = computed(() =>
  Object.entries(selectedModes.value)
    .filter(([, mode]) => mode === Mode.GUESS)
    .map(([id]) => id)
)

function selectLanguage(language: Language) {
  if (
    !playersByLanguage.value[language] ||
    !playersByLanguage.value[language].includes(playerId.value)
  ) {
    playSound("note")
  }
  Rune.actions.language(language)
}

function mode(mode: Mode, sound: boolean) {
  if (sound) {
    playSound("on")
  }
  Rune.actions.mode(mode)
}

onMounted(() => {
  lastDump.value = []
  lastNodes.value = []
})
</script>

<template>
  <audio autoplay loop src="sound/loop.mp3" />
  <img class="logo" alt="logo scribble" :src="logo" />
  <div class="languages">
    <div v-for="language of languages" :key="language" class="language">
      <button
        class="language-button"
        type="button"
        @click="selectLanguage(language)"
      >
        <component :is="flags[language]" class="language-flag"></component>
      </button>
      <div class="avatars">
        <Avatar
          v-for="id of playersByLanguage[language]"
          :id="id"
          :key="id"
          class="avatar"
        />
      </div>
    </div>
  </div>
  <div class="modes">
    <div class="mode">
      <button
        class="mode button"
        :class="{ 'button--selected': selectedFreeMode.includes(playerId) }"
        type="button"
        @click="mode(Mode.FREE, !selectedFreeMode.includes(playerId))"
      >
        <span
          >{{ t("Free mode") }}<br />({{ selectedFreeMode.length }}/{{
            playerIds.length
          }})</span
        >
      </button>
      <div class="min hidden">{{ t("min 2") }}</div>
    </div>
    <div class="mode">
      <button
        class="button"
        :class="{ 'button--selected': selectedGuessMode.includes(playerId) }"
        :disabled="playerIds.length < 2"
        type="button"
        @click="mode(Mode.GUESS, !selectedGuessMode.includes(playerId))"
      >
        <span
          >{{ t("Guess mode") }}<br />({{ selectedGuessMode.length }}/{{
            playerIds.length
          }})</span
        >
      </button>
      <div class="min">{{ t("min 2") }}</div>
    </div>
  </div>
</template>

<style scoped>
.logo {
  display: block;
  margin: 4vh auto;
  width: 90vw;
}
.languages {
  display: flex;
  flex-direction: column;
  padding: 0 5vw 0 0;
}
.language {
  display: flex;
  align-items: center;
  gap: 3vw;
  margin-left: auto;
}
.language-button {
  border: 0;
  background: none;
  padding: 0;
  margin: 0;
  width: 15vw;
  height: 15vw;
}
.language-flag {
  width: 15vw;
  height: 15vw;
}
.avatars {
  display: flex;
  align-items: center;
  gap: 1vw;
  width: 65vw;
}
.language .avatar {
  max-width: 10vw;
  animation: 0.2s ease-in both slide-down;
}
.modes {
  display: flex;
  padding: 0 6vw 3vh;
  align-items: center;
  justify-content: space-between;
  gap: 6vw;
  margin: auto 0;
}
.mode {
  flex: 1;
  font-size: 6vw;
  text-align: center;
}
.mode .button {
  width: 100%;
}
.min {
  margin-top: 3px;
}
.hidden {
  opacity: 0;
}
@keyframes slide-down {
  0% {
    translate: 0 -100%;
    opacity: 0;
  }
  100% {
    translate: 0 0;
    opacity: 1;
  }
}
</style>
