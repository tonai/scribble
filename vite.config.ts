import vue from "@vitejs/plugin-vue"
import path from "node:path"
import rune from "rune-sdk/vite"
import { defineConfig } from "vite"
import { qrcode } from "vite-plugin-qrcode"

// https://vitejs.dev/config/
export default defineConfig({
  base: "", // Makes paths relative
  build: {
    target: "es6",
  },
  plugins: [
    qrcode(), // only applies in dev mode
    vue(),
    rune({
      logicPath: path.resolve("./src/logic.ts"),
      minifyLogic: false, // This flag can be used if your logic reaches the allowed limit. However, it will make it significantly more difficult to detect validation issues
      ignoredDependencies: ["@tonai/game-utils/server"],
    }),
  ],
})
