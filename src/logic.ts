import { formatter, startCountDown } from "./constants/game"
import { words } from "./constants/words"
import { getScore } from "./helpers/game"
import { endRound, selectWord, startRound } from "./logic/round"
import { Mode } from "./types/logic"

Dusk.initLogic({
  minPlayers: 1,
  maxPlayers: 6,
  reactive: true,
  updatesPerSecond: 10,
  setup: (allPlayerIds) => ({
    countDown: formatter.format(startCountDown),
    drawingPayer: allPlayerIds[0],
    dump: "",
    guessWord: "",
    mode: Mode.WAIT,
    playerIds: allPlayerIds,
    playersGuessed: {},
    playersReady: [],
    rounds: Object.fromEntries(allPlayerIds.map((id) => [id, 0])),
    scores: Object.fromEntries(allPlayerIds.map((id) => [id, 0])),
    startTime: 0,
    words: [],
  }),
  actions: {
    draw(dump: string, { game, playerId }) {
      if (playerId !== game.drawingPayer) {
        return Dusk.invalidAction()
      }
      game.dump = dump
    },
    guess(word: string, { game, playerId }) {
      if (
        game.mode !== Mode.PLAY ||
        playerId in game.playersGuessed
      ) {
        return Dusk.invalidAction()
      }
      if (word.toLowerCase() === game.guessWord.toLowerCase()) {
        // console.log(playerId, 'guessed the word')
        const time = startCountDown * 1000 - (Dusk.gameTime() - game.startTime)
        const score = getScore(time)
        game.playersGuessed[playerId] = score;
        game.scores[playerId] += score
        if (Object.keys(game.playersGuessed).length === game.playerIds.length - 1) {
          endRound(game)
        }
      }
    },
    ready(_, { game, playerId }) {
      if (game.playersReady.indexOf(playerId) !== -1) {
        return Dusk.invalidAction()
      }
      game.playersReady.push(playerId)
      if (game.playersReady.length === game.playerIds.length) {
        selectWord(game)
      }
    },
    choose(word, { game, playerId }) {
      if (playerId !== game.drawingPayer || game.words.indexOf(word) === -1) {
        return Dusk.invalidAction()
      }
      // Remove the chosen word from the list to have it multiple times
      for (let list of Object.values(words.en)) {
        const index = list.indexOf(word);
        if (index !== -1) {
          list.splice(index, 1);
        }
      }
      game.guessWord = word
      startRound(game)
    },
  },
  events: {
    playerJoined(playerId, { game }) {
      game.playerIds.push(playerId)
      game.scores[playerId] = 0
      game.rounds[playerId] = Math.min(...Object.values(game.rounds));
    },
    playerLeft(playerId, { game }) {
      game.playerIds.splice(game.playerIds.indexOf(playerId), 1)
      game.playersReady.splice(game.playersReady.indexOf(playerId), 1)
      if (playerId === game.drawingPayer) {
        endRound(game)
      }
    },
  },
  update({ game }) {
    if (game.mode === Mode.PLAY) {
      const countDown =
        (startCountDown * 1000 - (Dusk.gameTime() - game.startTime)) / 1000
      if (countDown <= 0) {
        endRound(game)
      }
      game.countDown = formatter.format(countDown)
    }
  },
})
