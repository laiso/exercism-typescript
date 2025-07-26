export function makeDiamond(character: string): string {
  const targetChar = character.toUpperCase()
  const charCode = targetChar.charCodeAt(0)
  const startCode = 'A'.charCodeAt(0)
  const size = charCode - startCode
  
  if (size === 0) {
    return 'A\n'
  }
  
  const width = 2 * size + 1
  const rows: string[] = []
  
  // Generate top half (including middle)
  for (let i = 0; i <= size; i++) {
    const currentChar = String.fromCharCode(startCode + i)
    const outerSpaces = size - i
    const innerSpaces = i === 0 ? 0 : 2 * i - 1
    
    let row = ' '.repeat(outerSpaces) + currentChar
    if (innerSpaces > 0) {
      row += ' '.repeat(innerSpaces) + currentChar
    }
    row += ' '.repeat(outerSpaces)
    rows.push(row)
  }
  
  // Generate bottom half (excluding middle)
  for (let i = size - 1; i >= 0; i--) {
    const currentChar = String.fromCharCode(startCode + i)
    const outerSpaces = size - i
    const innerSpaces = i === 0 ? 0 : 2 * i - 1
    
    let row = ' '.repeat(outerSpaces) + currentChar
    if (innerSpaces > 0) {
      row += ' '.repeat(innerSpaces) + currentChar
    }
    row += ' '.repeat(outerSpaces)
    rows.push(row)
  }
  
  return rows.join('\n') + '\n'
}
