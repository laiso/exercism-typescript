const COLORS = [
  'black',
  'brown', 
  'red',
  'orange',
  'yellow',
  'green',
  'blue',
  'violet',
  'grey',
  'white'
]

export function decodedResistorValue(colors: string[]): string {
  const firstDigit = COLORS.indexOf(colors[0])
  const secondDigit = COLORS.indexOf(colors[1])
  const multiplier = COLORS.indexOf(colors[2])
  
  const baseValue = firstDigit * 10 + secondDigit
  const resistance = baseValue * Math.pow(10, multiplier)
  
  if (resistance >= 1_000_000_000) {
    return `${resistance / 1_000_000_000} gigaohms`
  } else if (resistance >= 1_000_000) {
    return `${resistance / 1_000_000} megaohms`
  } else if (resistance >= 1_000) {
    return `${resistance / 1_000} kiloohms`
  } else {
    return `${resistance} ohms`
  }
}
