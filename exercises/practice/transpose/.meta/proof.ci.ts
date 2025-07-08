export function transpose(input: string[]): string[] {
  if (input.length === 0) return []
  
  const maxLength = Math.max(...input.map(line => line.length))
  const result: string[] = []
  
  for (let col = 0; col < maxLength; col++) {
    let transposedLine = ''
    for (let row = 0; row < input.length; row++) {
      const char = input[row][col] || ' '
      transposedLine += char
    }
    result.push(transposedLine.replace(/\s+$/, ''))
  }
  
  return result
}
