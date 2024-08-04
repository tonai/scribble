import { formatter, startCountDown } from "./constants/game"
import { words } from "./constants/words"
import { getScore } from "./helpers/game"
import { endRound, selectLanguage, selectWord, startRound } from "./logic/round"
import { Action, DiffAction, Language, Mode } from "./types/logic"

Dusk.initLogic({
  minPlayers: 1,
  maxPlayers: 6,
  reactive: true,
  updatesPerSecond: 10,
  setup: (allPlayerIds) => ({
    countDown: formatter.format(startCountDown),
    drawingPayer: allPlayerIds[0],
    dump: [],
    guessWord: "",
    language: null,
    mode: Mode.WAIT,
    playerIds: allPlayerIds,
    playersGuessed: {},
    playersLanguage: [],
    playersReady: [],
    rounds: Object.fromEntries(allPlayerIds.map((id) => [id, 0])),
    scores: Object.fromEntries(allPlayerIds.map((id) => [id, 0])),
    startTime: 0,
    words: [],
  }),
  actions: {
    choose(word, { game, playerId }) {
      if (
        game.mode !== Mode.CHOOSE ||
        playerId !== game.drawingPayer ||
        game.words.indexOf(word) === -1
      ) {
        return Dusk.invalidAction()
      }
      // Remove the chosen word from the list to have it multiple times
      for (let list of Object.values(words[game.language ?? "en"])) {
        const index = list.indexOf(word)
        if (index !== -1) {
          list.splice(index, 1)
        }
      }
      game.guessWord = word
      startRound(game)
    },
    draw(diff: DiffAction[], { game, playerId }) {
      if (game.mode !== Mode.PLAY || playerId !== game.drawingPayer) {
        return Dusk.invalidAction()
      }
      for (const [action, index, dump] of diff) {
        switch (action) {
          case Action.CLEAR:
            game.dump = []
            break
          case Action.DELETE:
            game.dump[index] = ""
            break
          case Action.ADD:
            game.dump[index] = dump
            break
        }
      }
      game.dump = game.dump.filter((x) => x)
    },
    guess(word: string, { game, playerId }) {
      if (game.mode !== Mode.PLAY || playerId in game.playersGuessed) {
        return Dusk.invalidAction()
      }
      if (word.toLowerCase() === game.guessWord.toLowerCase()) {
        // console.log(playerId, 'guessed the word')
        const time = startCountDown * 1000 - (Dusk.gameTime() - game.startTime)
        const score = getScore(time)
        game.playersGuessed[playerId] = score
        game.scores[playerId] += score
        if (
          Object.keys(game.playersGuessed).length ===
          game.playerIds.length - 1
        ) {
          endRound(game)
        }
      }
    },
    language(language: Language, { game, playerId }) {
      if (game.mode !== Mode.WAIT) {
        return Dusk.invalidAction()
      }
      const index = game.playersLanguage.findIndex(({ id }) => id === playerId)
      if (index !== -1) {
        game.playersLanguage.splice(index, 1)
      }
      game.playersLanguage.push({ id: playerId, language })
      if (game.playersLanguage.length === game.playerIds.length) {
        selectLanguage(game)
      }
    },
    ready(_, { game, playerId }) {
      if (game.mode !== Mode.WAIT && game.mode !== Mode.SCORES) {
        return Dusk.invalidAction()
      }
      const index = game.playersReady.indexOf(playerId);
      if (index !== -1) {
        game.playersReady.splice(index, 1);
      } else {
        game.playersReady.push(playerId)
        if (game.playersReady.length === game.playerIds.length) {
          selectWord(game)
        }
      }
    },
  },
  events: {
    playerJoined(playerId, { game }) {
      game.playerIds.push(playerId)
      game.scores[playerId] = 0
      game.rounds[playerId] = Math.min(...Object.values(game.rounds))
    },
    playerLeft(playerId, { game }) {
      game.playerIds.splice(game.playerIds.indexOf(playerId), 1)
      game.playersReady.splice(game.playersReady.indexOf(playerId), 1)
      if (game.mode === Mode.PLAY && playerId === game.drawingPayer) {
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
