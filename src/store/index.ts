import { Drauu } from "drauu"
import { ref } from "vue"
import { startCountDown } from "../constants/game"
import { Language, Mode } from "../types/logic"

export const countDown = ref(startCountDown)
export const drauu = ref<Drauu>()
export const drawingPayer = ref("")
export const dump = ref("")
export const gameOver = ref(false)
export const guessWord = ref("")
export const hint = ref<{ index: number; revealTime: number }[]>([])
export const language = ref<Language | null>(null)
export const mode = ref(Mode.WAIT)
export const playerId = ref("")
export const playerIds = ref<string[]>([])
export const playersGuessed = ref<Record<string, number>>({})
export const playersLanguage = ref<{ id: string; language: Language }[]>([])
export const playersReady = ref<string[]>([])
export const scores = ref<Record<string, { score: number; total: number }>>({})
export const words = ref<string[]>([])
