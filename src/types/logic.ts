import { DuskClient, PlayerId } from "dusk-games-sdk"

export interface GameState {
  drawingPayer: PlayerId;
  dump: string;
  playerIds: PlayerId[]
}

export type GameActions = {
  draw: (dump: string) => void
}

declare global {
  const Dusk: DuskClient<GameState, GameActions>
}
