import { words } from "../src/constants/words"
import { Words } from "../src/types/logic"

export function calculateWordCount(words: Words) {
  const result: Record<string, Record<string, number>> = {}

  for (const language in words) {
    if (Object.prototype.hasOwnProperty.call(words, language)) {
      result[language] = {}

      for (const difficulty in words[language]) {
        if (Object.prototype.hasOwnProperty.call(words[language], difficulty)) {
          result[language][difficulty] = words[language][difficulty].length
        }
      }
    }
  }

  return result
}

console.log(calculateWordCount(words))
