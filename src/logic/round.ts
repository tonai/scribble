import { formatter, rounds, startCountDown } from "../constants/game"
import { words } from "../constants/words"
import { randomInt } from "../helpers/math"
import { GameState, Mode } from "../types/logic"

export function selectWord(game: GameState) {
  game.mode = Mode.CHOOSE
  const players = game.playerIds
  game.drawingPayer =
    players[(players.indexOf(game.drawingPayer) + 1) % players.length]
  game.countDown = formatter.format(startCountDown)
  game.words = Object.values(words.en).map((words) => {
    const index = randomInt(words.length - 1)
    return words[index]
  })
  game.playersGuessed = {}
  game.dump = ""
}

export function startRound(game: GameState) {
  game.mode = Mode.PLAY
  game.startTime = Dusk.gameTime()
}

export function endRound(game: GameState) {
  game.mode = Mode.SCORES
  const drawerScore = Object.values(game.playersGuessed).reduce(
    (acc, score) => acc + score,
    0
  )
  game.rounds[game.drawingPayer]++
  const score = Math.round(
    drawerScore / game.playerIds.length
  );
  game.playersGuessed[game.drawingPayer] = score
  game.scores[game.drawingPayer] += score
  game.playersReady = []
  if (
    !Object.values(game.rounds).some((playedRounds) => playedRounds < rounds)
  ) {
    Dusk.gameOver({
      players: game.scores,
      minimizePopUp: true,
    })
  }
}
