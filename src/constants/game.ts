import { Language } from "../types/logic";

export const startCountDown = 80
export const rounds = 3;
export const languages: Language[] = ['en', 'fr', 'ru', 'es', 'pt', 'cn'];

export const formatter = new Intl.NumberFormat("en-UK", {
  minimumIntegerDigits: 2,
  minimumFractionDigits: 1,
})

export const hintPercentage = 2 / 3;