import { Drauu } from "drauu"
import { ref } from "vue"
import { formatter, startCountDown } from "../constants/game"
import { Mode } from "../types/logic"

export const countDown = ref(formatter.format(startCountDown))
export const drauu = ref<Drauu>()
export const drawingPayer = ref("")
export const dump = ref("")
export const mode = ref(Mode.WAIT)
export const playerId = ref("")
export const scores = ref<Record<string, { score: number, total: number }>>({});
export const words = ref<string[]>([])