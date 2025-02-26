import { words } from "../src/constants/words"
import { Words } from "../src/types/logic"

export function calculateLongestWord(words: Words) {
  let result = { word: "", language: "", difficulty: "", length: 0 }

  for (const language in words) {
    if (Object.prototype.hasOwnProperty.call(words, language)) {
      for (const difficulty in words[language]) {
        if (Object.prototype.hasOwnProperty.call(words[language], difficulty)) {
          for (const word of words[language][difficulty]) {
            if (word.length > result.word.length) {
              result = { word, language, difficulty, length: word.length }
            }
          }
        }
      }
    }
  }

  return result
}

console.log(calculateLongestWord(words))
