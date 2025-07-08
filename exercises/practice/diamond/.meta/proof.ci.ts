export function makeDiamond(character: string): string {
  const charCode = character.charCodeAt(0)
  const aCode = 'A'.charCodeAt(0)
  const size = charCode - aCode + 1
  
  const lines: string[] = []
  
  for (let i = 0; i < size; i++) {
    const currentChar = String.fromCharCode(aCode + i)
    const outerSpaces = ' '.repeat(size - 1 - i)
    
    if (i === 0) {
      lines.push(outerSpaces + currentChar + outerSpaces)
    } else {
      const innerSpaces = ' '.repeat(2 * i - 1)
      lines.push(outerSpaces + currentChar + innerSpaces + currentChar + outerSpaces)
    }
  }
  
  for (let i = size - 2; i >= 0; i--) {
    lines.push(lines[i])
  }
  
  return lines.join('\n')
}
