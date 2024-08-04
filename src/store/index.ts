import { Drauu } from "drauu"
import { ref } from "vue"
import { formatter, startCountDown } from "../constants/game"
import { Language, Mode } from "../types/logic"

export const countDown = ref(formatter.format(startCountDown))
export const drauu = ref<Drauu>()
export const drawingPayer = ref("")
export const dump = ref("")
export const language = ref<Language | null>(null)
export const guessWord = ref('')
export const hint = ref<number[]>([])
export const mode = ref(Mode.WAIT)
export const playerId = ref("")
export const playerIds = ref<string[]>([])
export const playersLanguage = ref<{ id: string, language: Language }[]>([]);
export const playersReady = ref<string[]>([]);
export const scores = ref<Record<string, { score: number, total: number }>>({});
export const words = ref<string[]>([])