export function transpose(input: string[]): string[] {
  if (input.length === 0) return []
  
  // Find the maximum length
  const maxLength = Math.max(...input.map(line => line.length))
  
  const result: string[] = []
  
  for (let col = 0; col < maxLength; col++) {
    let transposedLine = ''
    
    for (let row = 0; row < input.length; row++) {
      // Get character at this position, or space if beyond line length
      const char = col < input[row].length ? input[row][col] : ' '
      transposedLine += char
    }
    
    // Remove trailing spaces
    result.push(transposedLine.replace(/\s+$/, ''))
  }
  
  return result
}
