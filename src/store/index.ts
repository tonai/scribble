import { Drauu, DrawingMode } from "drauu"
import { ref } from "vue"
import { startCountDown } from "../constants/game"
import { Action, DiffAction, Language, Mode, Step } from "../types/logic"
import {
  createAndMoveSvg,
  createSvg,
  removeSvg,
  updateSvg,
} from "../helpers/svg"

export const debugMessages = ref<string[]>([])

export const countDown = ref(startCountDown)
export const drauu = ref<Drauu>()
export const drawDump = ref<
  Record<string, Record<string, { dump: string; time: number }>>
>({})
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

export const activeBrush = ref<DrawingMode | "arrow">("draw")
export const activeColor = ref<string>("#000000")
export const activeSize = ref<number>(6)

export const svg = ref<SVGSVGElement>()
export const tmp = ref<SVGSVGElement>()
export const lastTime = ref<Record<string, number>>({})
export const lastDump = ref<string[]>([])
export const lastNodes = ref<SVGElement[]>([])

export function draw(drawDiff: Record<string, DiffAction[]>) {
  if (drauu.value && tmp.value) {
    const entries = Object.entries(drawDiff)
    for (const [id, actions] of entries) {
      let nextTime = 0
      for (const diffAction of actions) {
        const [time, action] = diffAction
        if (lastTime.value[id] && time <= lastTime.value[id]) {
          continue
        }
        switch (action) {
          case Action.CLEAR: {
            clear()
            break
          }
          case Action.ADD: {
            if (svg.value && id !== playerId.value) {
              createSvg(
                svg.value,
                tmp.value,
                diffAction,
                lastNodes.value,
                lastDump.value
              )
            }
            break
          }
          case Action.UPDATE: {
            if (svg.value && id !== playerId.value) {
              updateSvg(
                svg.value,
                tmp.value,
                diffAction,
                lastNodes.value,
                lastDump.value
              )
            }
            break
          }
          case Action.DELETE: {
            if (svg.value) {
              removeSvg(svg.value, diffAction, lastNodes.value, lastDump.value)
            }
            if (tmp.value) {
              removeSvg(tmp.value, diffAction, lastNodes.value, lastDump.value)
            }
            break
          }
        }
        nextTime = Math.max(nextTime, time)
      }
      lastTime.value[id] = Math.max(lastTime.value[id] || 0, nextTime)
    }
  }
}

export function load(dumps: { dump: string; id: string; time: number }[]) {
  if (drauu.value && tmp.value && svg.value) {
    for (const playerDump of dumps) {
      const { dump, id, time } = playerDump
      createAndMoveSvg(
        svg.value,
        tmp.value,
        [time, Action.ADD, String(time), String(id), dump],
        lastNodes.value,
        lastDump.value
      )
    }
  }
}

export function clear() {
  if (drauu.value) {
    drauu.value.clear()
  }
  if (tmp.value) {
    tmp.value.innerHTML = ""
  }
  lastNodes.value = []
  lastDump.value = []
}
