import { DuskClient, PlayerId } from "dusk-games-sdk"

export enum Mode {
  CHOOSE,
  PLAY,
  SCORES,
  WAIT,
}

export interface GameState {
  countDown: string
  drawingPayer: PlayerId
  dump: string
  guessWord: string
  mode: Mode
  playerIds: PlayerId[]
  playersGuessed: Record<PlayerId, number>
  playersReady: PlayerId[]
  rounds: Record<PlayerId, number>
  scores: Record<PlayerId, number>
  startTime: number
  words: string[]
}

export type GameActions = {
  choose: (word: string) => void
  draw: (dump: string) => void
  guess: (word: string) => void
  ready: () => void
}

declare global {
  const Dusk: DuskClient<GameState, GameActions>
}
