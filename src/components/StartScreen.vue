<script setup lang="ts">
import type { Component } from 'vue';
import { languages } from '../constants/game';
import { t } from '../helpers/i18n';
import { language } from '../store';
import { Language } from '../types/logic';
import Cn from './icon/Cn.vue';
import Es from './icon/Es.vue';
import Fr from './icon/Fr.vue';
import Pt from './icon/Pt.vue';
import Ru from './icon/Ru.vue';
import Uk from './icon/Uk.vue';

const flags: Record<Language, Component> = {
  cn: Cn,
  en: Uk,
  es: Es,
  fr: Fr,
  pt: Pt,
  ru: Ru,
}

function selectLanguage(language: Language) {
  Dusk.actions.language(language);
}

function ready() {
  Dusk.actions.ready();
}
</script>

<template>
  <button v-for="language of languages" type="button" @click="selectLanguage(language)"><component :is="flags[language]"></component></button>
  <button v-if="language" type="button" @click="ready">{{ t('Ready') }}</button>
</template>