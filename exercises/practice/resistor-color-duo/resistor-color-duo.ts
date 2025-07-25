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

export function decodedValue(colors: string[]): number {
  const colorCode = (color: string): number => COLORS.indexOf(color)
  return colorCode(colors[0]) * 10 + colorCode(colors[1])
}
