export function makeDiamond(character: string): string {
  if (character === 'A') {
    return 'A\n'
  }

  const charCode = character.charCodeAt(0)
  const aCode = 'A'.charCodeAt(0)
  const n = charCode - aCode // Distance from A (0 for A, 1 for B, etc.)
  
  const lines: string[] = []
  const width = 2 * n + 1 // Total width of the diamond
  
  // Create the top half (including middle)
  for (let i = 0; i <= n; i++) {
    const currentChar = String.fromCharCode(aCode + i)
    
    if (i === 0) {
      // First line (A)
      const padding = ' '.repeat(n)
      lines.push(padding + currentChar + padding)
    } else {
      // Other lines
      const outerPadding = ' '.repeat(n - i)
      const innerPadding = ' '.repeat(2 * i - 1)
      lines.push(outerPadding + currentChar + innerPadding + currentChar + outerPadding)
    }
  }
  
  // Create the bottom half (mirror of top, excluding middle)
  for (let i = n - 1; i >= 0; i--) {
    lines.push(lines[i])
  }
  
  return lines.join('\n') + '\n'
}
