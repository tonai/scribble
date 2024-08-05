export function randomInt(max: number, min = 0) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

export function unusedRandomInt(used: number[], max: number, min = 0) {
  const int = randomInt(max, min)
  if (used.includes(int)) {
    return unusedRandomInt(used, max, min)
  }
  return int
}
