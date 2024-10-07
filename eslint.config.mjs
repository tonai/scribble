import js from "@eslint/js"
import prettier from "eslint-plugin-prettier/recommended"
import pluginVue from "eslint-plugin-vue"
import globals from "globals"
import runePlugin from "rune-sdk/eslint.js"
import tseslint from "typescript-eslint"

export default [
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.es2020,
      },
      ecmaVersion: "latest",
      sourceType: "module",
    },
  },
  js.configs.recommended,
  ...runePlugin.configs.recommended,
  ...tseslint.configs.recommended,
  ...pluginVue.configs["flat/recommended"],
  prettier,
  {
    rules: {
      "prettier/prettier": "warn",
      "vue/multi-word-component-names": "off",
    },
  },
  {
    files: ["*.vue", "**/*.vue"],
    languageOptions: {
      parserOptions: {
        parser: tseslint.parser,
      },
    },
  },
]
