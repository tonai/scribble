import { hintPercentage, rounds, startCountDown } from "../constants/game"
import { words } from "../constants/words"
import { randomInt } from "../helpers/math"
import { GameState, Language, Mode } from "../types/logic"

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
}

export function selectWord(game: GameState) {
  game.mode = Mode.CHOOSE
  const players = game.playerIds
  game.drawingPayer =
    players[(players.indexOf(game.drawingPayer) + 1) % players.length]
  game.countDown = startCountDown
  game.words = Object.values(words[game.language ?? "en"]).map((words) => {
    const index = randomInt(words.length - 1)
    return words[index]
  })
  game.playersGuessed = {}
  game.dump = []
  game.hint = []
}

export function startRound(game: GameState) {
  game.mode = Mode.PLAY
  game.startTime = Dusk.gameTime()
  // Pre-calculate hints over time
  const hintWord = game.guessWord.replaceAll(/[^\s'.-]/gi, "_")
  const matches = [...hintWord.matchAll(/_/g)]
  const length = matches.length
  const hints = Math.floor(length * hintPercentage)
  for (let i = 0; i < hints; i++) {
    const matchIndex = randomInt(length - 1)
    game.hint.push({
      index: matches[matchIndex].index,
      revealTime: (startCountDown * (hints - i)) / (hints + 1),
    })
  }
}

export function endRound(game: GameState) {
  game.mode = Mode.SCORES
  const drawerScore = Object.values(game.playersGuessed).reduce(
    (acc, score) => acc + score,
    0
  )
  game.rounds[game.drawingPayer]++
  const score = Math.round(drawerScore / game.playerIds.length)
  game.playersGuessed[game.drawingPayer] = score
  game.scores[game.drawingPayer] += score
  game.playersReady = []
  if (
    !Object.values(game.rounds).some((playedRounds) => playedRounds < rounds) ||
    game.playerIds.length === 1
  ) {
    Dusk.gameOver({
      players: game.scores,
      minimizePopUp: true,
    })
  }
}
