import { translations } from "../constants/i18n"
import { language } from "../store"

export function t(word: string) {
  if (
    language.value &&
    language.value in translations &&
    word in translations[language.value]
  ) {
    return translations[language.value][word]
  }
  return word
}
