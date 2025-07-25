export function decodedResistorValue(colors: string[]): string {
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
    'white',
  ]
  
  const colorCode = (color: string): number => COLORS.indexOf(color)
  
  // Get the base value from first two colors
  const baseValue = colorCode(colors[0]) * 10 + colorCode(colors[1])
  
  // Get the multiplier from the third color (10^n)
  const multiplier = Math.pow(10, colorCode(colors[2]))
  
  const resistance = baseValue * multiplier
  
  // Format with appropriate unit
  if (resistance >= 1000000000) {
    return `${resistance / 1000000000} gigaohms`
  } else if (resistance >= 1000000) {
    return `${resistance / 1000000} megaohms`
  } else if (resistance >= 1000) {
    return `${resistance / 1000} kiloohms`
  } else {
    return `${resistance} ohms`
  }
}
