export function transpose(input: string[]): string[] {
  if (input.length === 0) return []
  
  const maxLength = Math.max(...input.map(line => line.length))
  const result: string[] = []
  
  for (let col = 0; col < maxLength; col++) {
    let transposedLine = ''
    
    for (let row = 0; row < input.length; row++) {
      if (col < input[row].length) {
        transposedLine += input[row][col]
      } else {
        transposedLine += ' '
      }
    }
    
    let lastActualRow = -1
    for (let row = input.length - 1; row >= 0; row--) {
      if (col < input[row].length) {
        lastActualRow = row
        break
      }
    }
    
    if (lastActualRow >= 0) {
      result.push(transposedLine.substring(0, lastActualRow + 1))
    } else {
      result.push('')
    }
  }
  
  return result
}
