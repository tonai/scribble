import { Language } from "../types/logic"

export const translations: Record<Language, Record<string, string>> = {
  en: {
    Ready: "Ready",
    "Free mode": "Free mode",
    "Guess mode": "Guess mode",
    "min 2": "min 2",
  },
  fr: {
    Ready: "Prêt",
    "Free mode": "Mode libre",
    "Guess mode": "Mode devinette",
    "min 2": "min 2",
  },
  ru: {
    Ready: "Готовый",
    "Free mode": "Свободный режим",
    "Guess mode": "Режим угадывания",
    "min 2": "мин 2",
  },
  es: {
    Ready: "Listo",
    "Free mode": "Modo libre",
    "Guess mode": "Modo adivinar",
    "min 2": "mínimo 2",
  },
  pt: {
    Ready: "Preparar",
    "Free mode": "Modo livre",
    "Guess mode": "Modo de adivinhação",
    "min 2": "min 2",
  },
  cn: {
    Ready: "准备好",
    "Free mode": "自由模式",
    "Guess mode": "猜猜模式",
    "min 2": "分钟 2",
  },
}
