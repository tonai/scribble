const formatter = new Intl.NumberFormat("en-UK", {
  minimumIntegerDigits: 2,
  minimumFractionDigits: 1,
})

export function format(number: number) {
  return formatter.format(number)
}
