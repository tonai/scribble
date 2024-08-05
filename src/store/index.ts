import { Drauu } from "drauu"
import { ref } from "vue"
import { startCountDown } from "../constants/game"
import { Action, DiffAction, Language, Mode, Step } from "../types/logic"
import { createSvg, removeSvg } from "../helpers/svg"

export const countDown = ref(startCountDown)
export const drauu = ref<Drauu>()
export const drawingPayer = ref("")
export const gameOver = ref(false)
export const guessWord = ref("")
export const hint = ref<{ index: number; revealTime: number }[]>([])
export const language = ref<Language | null>(null)
export const mode = ref<Mode>(Mode.GUESS)
export const playerId = ref("")
export const playerIds = ref<string[]>([])
export const playersGuessed = ref<Record<string, number>>({})
export const playersLanguage = ref<{ id: string; language: Language }[]>([])
export const playersReady = ref<string[]>([])
export const scores = ref<Record<string, { score: number; total: number }>>({})
export const selectedModes = ref<Record<string, Mode>>({})
export const step = ref(Step.WAIT)
export const words = ref<string[]>([])

export const svg = ref<SVGSVGElement>()
export const tmp = ref<SVGSVGElement>()

export function draw(drawDiff: Record<string, DiffAction[]>) {
  if (drauu.value && tmp.value) {
    const entries = Object.entries(drawDiff).filter(
      ([id]) => id !== playerId.value
    )
    for (const [id, actions] of entries) {
      for (const diffAction of actions) {
        switch (diffAction[0]) {
          case Action.CLEAR: {
            drauu.value.load("")
            break
          }
          case Action.ADD: {
            const node = createSvg(tmp.value, diffAction, id)
            if (svg.value) {
              svg.value.append(node)
            }
            break
          }
          case Action.UPDATE: {
            const node = createSvg(tmp.value, diffAction, id)
            if (svg.value) {
              removeSvg(svg.value, diffAction, id)
              svg.value.append(node)
            }
            break
          }
          case Action.DELETE: {
            if (svg.value) {
              removeSvg(svg.value, diffAction, id)
            }
            break
          }
        }
      }
    }
  }
}
