import { multiplier, startCountDown } from "./constants/game"
import { words } from "./constants/words"
import { getScore } from "./helpers/game"
import {
  endRound,
  selectLanguage,
  selectMode,
  selectWord,
  startRound,
} from "./logic/round"
import {
  Action,
  DiffAction,
  Language,
  LanguageWords,
  Mode,
  Step,
} from "./types/logic"

Rune.initLogic({
  minPlayers: 1,
  maxPlayers: 6,
  reactive: true,
  updatesPerSecond: 10,
  setup: (allPlayerIds) => ({
    availableWords: words.en,
    countDown: startCountDown,
    difficulty: "easy",
    drawingPayer: allPlayerIds[0],
    drawDiff: Object.fromEntries(allPlayerIds.map((id) => [id, []])),
    drawDump: Object.fromEntries(allPlayerIds.map((id) => [id, {}])),
    gameOver: false,
    guessWord: "",
    hint: [],
    language: null,
    mode: Mode.GUESS,
    playerIds: allPlayerIds,
    playersGuessed: {},
    playersLanguage: [],
    playersReady: [],
    rounds: Object.fromEntries(allPlayerIds.map((id) => [id, 0])),
    scores: Object.fromEntries(allPlayerIds.map((id) => [id, 0])),
    selectedModes: {},
    startTime: 0,
    step: Step.WAIT,
    words: [],
  }),
  actions: {
    back(_, { game }) {
      if (game.mode !== Mode.FREE) {
        return Rune.invalidAction()
      }
      game.selectedModes = {}
      game.step = Step.WAIT
    },
    choose(word, { game, playerId }) {
      if (
        game.step !== Step.CHOOSE ||
        playerId !== game.drawingPayer ||
        game.words.indexOf(word) === -1
      ) {
        return Rune.invalidAction()
      }
      // Remove the chosen word from the list to have it multiple times
      for (const list of Object.values(game.availableWords)) {
        const index = list.indexOf(word)
        if (index !== -1) {
          list.splice(index, 1)
        }
      }
      game.guessWord = word
      game.difficulty = Object.keys(game.availableWords)[
        game.words.indexOf(word)
      ] as keyof LanguageWords
      startRound(game)
    },
    clear(time: number, { game, playerId }) {
      if (
        game.step !== Step.PLAY ||
        (playerId !== game.drawingPayer && game.mode === Mode.GUESS)
      ) {
        return Rune.invalidAction()
      }
      game.drawDiff = Object.fromEntries(game.playerIds.map((id) => [id, []]))
      game.drawDump = Object.fromEntries(game.playerIds.map((id) => [id, {}]))
      game.drawDiff[playerId] = [[time, Action.CLEAR]]
    },
    draw(diffs: DiffAction[], { game, playerId }) {
      if (
        game.step !== Step.PLAY ||
        (playerId !== game.drawingPayer && game.mode === Mode.GUESS)
      ) {
        return Rune.invalidAction()
      }
      game.drawDiff[playerId] = diffs
      for (const [time, action, timeId, id, dump] of diffs) {
        switch (action) {
          case Action.DELETE:
            delete game.drawDump[id][timeId]
            break

          case Action.ADD:
          case Action.UPDATE:
            if (timeId) {
              game.drawDump[id][timeId] = { dump, time }
            }
            break
        }
      }
    },
    guess(word: string, { game, playerId }) {
      if (game.step !== Step.PLAY || playerId in game.playersGuessed) {
        return Rune.invalidAction()
      }
      if (word.toLowerCase().trim() === game.guessWord.toLowerCase()) {
        const time = startCountDown * 1000 - (Rune.gameTime() - game.startTime)
        const score = Math.round(getScore(time) * multiplier[game.difficulty])
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
      if (game.step !== Step.WAIT) {
        return Rune.invalidAction()
      }
      const index = game.playersLanguage.findIndex(({ id }) => id === playerId)
      // Skip if same language selected
      if (index !== -1 && language === game.playersLanguage[index].language) {
        return
      }
      if (index !== -1) {
        game.playersLanguage.splice(index, 1)
      }
      game.playersLanguage.push({ id: playerId, language })
      selectLanguage(game)
    },
    mode(mode, { game, playerId }) {
      if (game.step !== Step.WAIT) {
        return Rune.invalidAction()
      }
      game.selectedModes[playerId] = mode
      if (Object.keys(game.selectedModes).length === game.playerIds.length) {
        selectMode(game)
      }
    },
    ready(_, { game, playerId }) {
      if (game.step !== Step.SCORES) {
        return Rune.invalidAction()
      }
      const index = game.playersReady.indexOf(playerId)
      if (index !== -1) {
        game.playersReady.splice(index, 1)
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
      game.scores[playerId] = game.scores[playerId] ?? 0
      game.rounds[playerId] = Math.min(...Object.values(game.rounds))
      game.drawDiff[playerId] = []
      game.drawDump[playerId] = {}
    },
    playerLeft(playerId, { game }) {
      game.playerIds.splice(game.playerIds.indexOf(playerId), 1)
      const readyIndex = game.playersReady.indexOf(playerId)
      if (readyIndex > -1) {
        game.playersReady.splice(readyIndex, 1)
      }
      const languageIndex = game.playersLanguage.findIndex(
        ({ id }) => id === playerId
      )
      if (languageIndex > -1) {
        game.playersLanguage.splice(languageIndex, 1)
      }
      if (game.mode === Mode.GUESS) {
        if (game.step === Step.CHOOSE && playerId === game.drawingPayer) {
          selectWord(game)
        } else if (game.step === Step.PLAY && playerId === game.drawingPayer) {
          endRound(game)
        }
      }
    },
  },
  update({ game }) {
    if (game.step === Step.PLAY && game.mode === Mode.GUESS) {
      const countDown =
        (startCountDown * 1000 - (Rune.gameTime() - game.startTime)) / 1000
      if (countDown <= 0) {
        endRound(game)
      }
      game.countDown = countDown
    }
  },
})
