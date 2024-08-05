<script setup lang="ts">
import { computed, type Component } from "vue"
import logo from "../assets/logo.png"
import { languages } from "../constants/game"
import { t } from "../helpers/i18n"
import { language, playerId, playerIds, playersLanguage, playersReady } from "../store"
import { Language } from "../types/logic"
import Cn from "./icon/Cn.vue"
import Es from "./icon/Es.vue"
import Fr from "./icon/Fr.vue"
import Pt from "./icon/Pt.vue"
import Ru from "./icon/Ru.vue"
import Uk from "./icon/Uk.vue"
import Avatar from "./Avatar.vue"

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

function selectLanguage(language: Language) {
  Dusk.actions.language(language)
}

function ready() {
  Dusk.actions.ready()
}
</script>

<template>
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
          :key="id"
          class="avatar"
          :id="id"
        />
      </div>
    </div>
  </div>
  <div class="modes">
    <!-- <button v-if="language" class="mode button" type="button" @click="ready">
      <span>{{ t("Free mode") }}</span>
    </button> -->
    <button
      class="mode button"
      :class="{ 'button--selected': playersReady.includes(playerId) }"
      type="button"
      @click="ready"
    >
      <span>{{ t("Guess mode") }} ({{ playersReady.length }}/{{ playerIds.length }})</span>
    </button>
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
}
</style>
