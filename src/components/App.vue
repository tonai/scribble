<script setup lang="ts">
import { onMounted } from "vue"
import { drauu, drawingPayer, dump, playerId } from "../store"
import Draw from "./Draw.vue"
import DrawControls from "./DrawControls.vue"

onMounted(() => {
  Dusk.initClient({
    onChange: ({ game, yourPlayerId }) => {
      if (yourPlayerId && playerId.value !== yourPlayerId) {
        playerId.value = yourPlayerId
      }
      if (game.drawingPayer && drawingPayer.value !== game.drawingPayer) {
        drawingPayer.value = game.drawingPayer
      }
      if (
        game.dump &&
        game.drawingPayer !== yourPlayerId &&
        dump.value !== game.dump
      ) {
        dump.value = game.dump
        if (drauu.value) {
          drauu.value.load(game.dump)
        }
      }
    },
  })
})
</script>

<template>
  <div class="container">
    <DrawControls v-if="drawingPayer === playerId" />
    <Draw />
  </div>
</template>

<style scoped>
.container {
  display: flex;
  height: 100%;
  flex-direction: column;
}
</style>
