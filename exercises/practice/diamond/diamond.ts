export function makeDiamond(character: string): string {
  if (character === 'A') {
    return 'A\n'
  }
  
  const charCode = character.charCodeAt(0)
  const aCode = 'A'.charCodeAt(0)
  const size = charCode - aCode
  const lines: string[] = []
  
  for (let i = 0; i <= size; i++) {
    const currentChar = String.fromCharCode(aCode + i)
    const outerSpaces = ' '.repeat(size - i)
    
    if (i === 0) {
      lines.push(outerSpaces + currentChar + outerSpaces)
    } else {
      const innerSpaces = ' '.repeat(2 * i - 1)
      lines.push(outerSpaces + currentChar + innerSpaces + currentChar + outerSpaces)
    }
  }
  
  for (let i = size - 1; i >= 0; i--) {
    lines.push(lines[i])
  }
  
  return lines.join('\n') + '\n'
}
