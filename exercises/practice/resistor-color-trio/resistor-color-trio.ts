export function decodedResistorValue(colors: string[]): string {
  const colorValues: { [key: string]: number } = {
    'black': 0,
    'brown': 1,
    'red': 2,
    'orange': 3,
    'yellow': 4,
    'green': 5,
    'blue': 6,
    'violet': 7,
    'grey': 8,
    'white': 9
  }
  
  const firstDigit = colorValues[colors[0]]
  const secondDigit = colorValues[colors[1]]
  const multiplier = colorValues[colors[2]]
  
  const value = (firstDigit * 10 + secondDigit) * Math.pow(10, multiplier)
  
  if (value >= 1000000000) {
    return `${value / 1000000000} gigaohms`
  } else if (value >= 1000000) {
    return `${value / 1000000} megaohms`
  } else if (value >= 1000) {
    return `${value / 1000} kiloohms`
  } else {
    return `${value} ohms`
  }
}
