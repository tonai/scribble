import {
  hintPercentage,
  multiplier,
  rounds,
  startCountDown,
} from "../constants/game"
import { words } from "../constants/words"
import { randomInt, unusedRandomInt } from "../helpers/math"
import { GameState, Language, Mode, Step } from "../types/logic"

export function selectLanguage(game: GameState) {
  const groupedVotes = game.playersLanguage.reduce(
    (acc, { language }) => {
      acc[language] = (acc[language] ?? 0) + 1
      return acc
    },
    {} as Record<Language, number>
  )
  const max = Math.max(...Object.values(groupedVotes))
  const maxVotes = Object.entries(groupedVotes).filter(
    ([, number]) => number === max
  ) as [Language, number][]
  const index = randomInt(maxVotes.length - 1)
  game.language = maxVotes[index][0]
  game.availableWords = words[game.language]
}

export function selectMode(game: GameState) {
  if (game.playerIds.length > 1) {
    const groupedVotes = Object.values(game.selectedModes).reduce(
      (acc, mode) => {
        acc[mode] = (acc[mode] ?? 0) + 1
        return acc
      },
      {} as Record<Mode, number>
    )
    const max = Math.max(...Object.values(groupedVotes))
    const maxVotes = Object.entries(groupedVotes).filter(
      ([, number]) => number === max
    ) as [string, number][]
    const index = randomInt(maxVotes.length - 1)
    game.mode = maxVotes[index][0] as Mode
  } else {
    game.mode = Mode.FREE
  }
  if (game.mode === Mode.GUESS) {
    selectWord(game)
  } else {
    game.drawDiff = Object.fromEntries(game.playerIds.map((id) => [id, []]))
    game.step = Step.PLAY
  }
}

export function selectWord(game: GameState) {
  game.step = Step.CHOOSE
  const players = game.playerIds
  game.drawingPayer =
    players[(players.indexOf(game.drawingPayer) + 1) % players.length]
  game.countDown = startCountDown
  game.words = Object.values(game.availableWords).map((words) => {
    const index = randomInt(words.length - 1)
    return words[index]
  })
  game.playersGuessed = {}
  game.drawDiff = Object.fromEntries(game.playerIds.map((id) => [id, []]))
  game.drawDump = Object.fromEntries(game.playerIds.map((id) => [id, {}]))
  game.hint = []
}

export function startRound(game: GameState) {
  game.step = Step.PLAY
  game.startTime = Rune.gameTime()
  // Pre-calculate hints over time
  const hintWord = game.guessWord.replaceAll(/[^\s'.-]/gi, "_")
  const matches = [...hintWord.matchAll(/_/g)]
  const length = matches.length
  const hints = Math.floor(length * hintPercentage)
  for (let i = 0; i < hints; i++) {
    const matchIndex = unusedRandomInt(
      game.hint.map(({ index }) => index),
      length - 1
    )
    game.hint.push({
      index: matches[matchIndex].index,
      revealTime: (startCountDown * (hints - i)) / (hints + 1),
    })
  }
}

export function endRound(game: GameState) {
  game.step = Step.SCORES
  const drawerScore = Object.values(game.playersGuessed).reduce(
    (acc, score) => acc + score,
    0
  )
  game.rounds[game.drawingPayer]++
  const score = Math.round(
    (drawerScore / game.playerIds.length) * multiplier[game.difficulty]
  )
  game.playersGuessed[game.drawingPayer] = score
  game.scores[game.drawingPayer] += score
  game.playersReady = []
  const playerRounds = Object.fromEntries(
    Object.entries(game.rounds).filter(([id]) => game.playerIds.includes(id))
  )
  if (
    !Object.values(playerRounds).some(
      (playedRounds) => playedRounds < rounds
    ) ||
    game.playerIds.length === 1
  ) {
    game.gameOver = true
    const scores = Object.fromEntries(
      Object.entries(game.scores).filter(([id]) => game.playerIds.includes(id))
    )
    Rune.gameOver({
      players: scores,
      minimizePopUp: true,
    })
  }
}
