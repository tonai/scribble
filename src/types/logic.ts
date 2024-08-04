import { DuskClient, PlayerId } from "dusk-games-sdk"

export enum Mode {
  CHOOSE,
  PLAY,
  SCORES,
  WAIT,
}

export type Language = 'en' | 'fr' | 'ru' | 'es' | 'pt' | 'cn'

export interface LanguageWords {
  easy: string[]
  medium: string[]
  hard: string[]
}

export type Words = Record<Language, LanguageWords>

export enum Action {
  CLEAR,
  ADD,
  DELETE,
}

export type DiffAction = [Action.CLEAR] | [Action.ADD, number, string] | [Action.DELETE, number]

export interface GameState {
  countDown: string
  drawingPayer: PlayerId
  dump: string[]
  guessWord: string
  language: Language | null
  mode: Mode
  playerIds: PlayerId[]
  playersGuessed: Record<PlayerId, number>
  playersLanguage: { id: string, language: Language }[]
  playersReady: PlayerId[]
  rounds: Record<PlayerId, number>
  scores: Record<PlayerId, number>
  startTime: number
  words: string[]
}

export type GameActions = {
  choose: (word: string) => void
  draw: (diff: DiffAction[]) => void
  guess: (word: string) => void
  language: (language: Language) => void
  ready: () => void
}

declare global {
  const Dusk: DuskClient<GameState, GameActions>
}
