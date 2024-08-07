import { Drauu } from "drauu"
import { ref } from "vue"
import { startCountDown } from "../constants/game"
import { Action, DiffAction, Language, Mode, Step } from "../types/logic"
import { createSvg, removeSvg, updateSvg } from "../helpers/svg"

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

export const svg = ref<SVGSVGElement>()
export const tmp = ref<SVGSVGElement>()
export const lastTime = ref(0)
export const lastDump = ref<string[]>([])
export const lastNodes = ref<SVGElement[]>([])

export function draw(drawDiff: Record<string, DiffAction[]>) {
  if (drauu.value && tmp.value) {
    const entries = Object.entries(drawDiff) /*.filter(
      ([id]) => id !== playerId.value
    )*/
    let nextTime = 0
    for (const [id, actions] of entries) {
      for (const diffAction of actions) {
        const [time, action] = diffAction
        if (time <= lastTime.value) {
          continue
        }
        switch (action) {
          case Action.CLEAR: {
            drauu.value.load("")
            break
          }
          case Action.ADD: {
            if (svg.value && id !== playerId.value) {
              const node = createSvg(
                tmp.value,
                diffAction,
                lastNodes.value,
                lastDump.value
              )
              svg.value.append(node)
            }
            break
          }
          case Action.UPDATE: {
            if (svg.value && id !== playerId.value) {
              const node = updateSvg(
                svg.value,
                tmp.value,
                diffAction,
                lastNodes.value,
                lastDump.value
              )
              svg.value.append(node)
            }
            break
          }
          case Action.DELETE: {
            if (svg.value) {
              removeSvg(svg.value, diffAction, lastNodes.value, lastDump.value)
            }
            break
          }
        }
        nextTime = Math.max(nextTime, time)
      }
    }
    lastTime.value = Math.max(lastTime.value, nextTime)
  }
}

export function load(
  dumps: { dump: string; id: string; time: number }[]
) {
  if (drauu.value && tmp.value) {
    for (const playerDump of dumps) {
      const { dump, id, time } = playerDump
      const node = createSvg(
        tmp.value,
        [time, Action.ADD, String(time), String(id), dump],
        lastNodes.value,
        lastDump.value
      )
      if (svg.value) {
        svg.value.append(node)
      }
    }
  }
}
