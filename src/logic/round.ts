import { formatter, rounds, startCountDown } from "../constants/game"
import { words } from "../constants/words"
import { randomInt } from "../helpers/math"
import { GameState, Language, Mode } from "../types/logic"

export function selectLanguage(game: GameState) {
  const groupedVotes = game.playersLanguage.reduce((acc, { language }) => {
    acc[language] = (acc[language] ?? 0) + 1;
    return acc;
  }, {} as Record<Language, number>);
  const max = Math.max(...Object.values(groupedVotes));
  const maxVotes = Object.entries(groupedVotes).filter(
    ([_, number]) => number === max
  ) as [Language, number][];
  const index = randomInt(maxVotes.length - 1);
  game.language = maxVotes[index][0];
}

export function selectWord(game: GameState) {
  game.mode = Mode.CHOOSE
  const players = game.playerIds
  game.drawingPayer =
    players[(players.indexOf(game.drawingPayer) + 1) % players.length]
  game.countDown = formatter.format(startCountDown)
  game.words = Object.values(words[game.language ?? 'en']).map((words) => {
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
