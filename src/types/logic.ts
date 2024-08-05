import { DuskClient, PlayerId } from "dusk-games-sdk"

export enum Mode {
  FREE = "free",
  GUESS = "guess",
}

export enum Step {
  CHOOSE,
  PLAY,
  SCORES,
  WAIT,
}

export type Language = "en" | "fr" | "ru" | "es" | "pt" | "cn"

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
  UPDATE,
}

export type ClearAction = [Action.CLEAR]
export type AddAction = [Action.ADD, number, string]
export type DeleteAction = [Action.DELETE, number]
export type UpdateAction = [Action.UPDATE, number, string]

export type DiffAction = ClearAction | AddAction | DeleteAction | UpdateAction

export interface GameState {
  availableWords: LanguageWords
  countDown: number
  drawingPayer: PlayerId
  drawDiff: Record<PlayerId, DiffAction[]>
  gameOver: boolean
  guessWord: string
  hint: { index: number; revealTime: number }[]
  language: Language | null
  mode: Mode
  playerIds: PlayerId[]
  playersGuessed: Record<PlayerId, number>
  playersLanguage: { id: string; language: Language }[]
  playersReady: PlayerId[]
  rounds: Record<PlayerId, number>
  scores: Record<PlayerId, number>
  selectedModes: Record<PlayerId, Mode>
  startTime: number
  step: Step
  words: string[]
}

export type GameActions = {
  choose: (word: string) => void
  draw: (diff: DiffAction[]) => void
  guess: (word: string) => void
  language: (language: Language) => void
  mode: (mode: Mode) => void
  ready: () => void
}

declare global {
  const Dusk: DuskClient<GameState, GameActions>
}
