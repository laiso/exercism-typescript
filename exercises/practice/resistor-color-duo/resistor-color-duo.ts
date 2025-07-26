export function decodedValue(colors: string[]): number {
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
    'white': 9,
  }
  
  return colorValues[colors[0]] * 10 + colorValues[colors[1]]
}
