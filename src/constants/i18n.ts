import { Language } from "../types/logic"

export const translations: Record<Language, Record<string, string>> = {
  en: {
    Ready: "Ready",
    "Free mode": "Free mode",
    "Guess mode": "Guess mode",
  },
  fr: {
    Ready: "Prêt",
    "Free mode": "Mode libre",
    "Guess mode": "Mode devinette",
  },
  ru: {
    Ready: "Готовый",
    "Free mode": "Свободный режим",
    "Guess mode": "Режим угадывания",
  },
  es: {
    Ready: "Listo",
    "Free mode": "Modo libre",
    "Guess mode": "Modo adivinar",
  },
  pt: {
    Ready: "Preparar",
    "Free mode": "Modo livre",
    "Guess mode": "Modo de adivinhação",
  },
  cn: {
    Ready: "准备好",
    "Free mode": "自由模式",
    "Guess mode": "猜猜模式",
  },
}
