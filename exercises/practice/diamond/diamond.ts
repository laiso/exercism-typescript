export function makeDiamond(character: string): string {
  const charCode = character.charCodeAt(0)
  const size = charCode - 'A'.charCodeAt(0)
  let diamond = ''

  for (let i = 0; i <= size; i++) {
    diamond += ' '.repeat(size - i)
    diamond += String.fromCharCode('A'.charCodeAt(0) + i)
    if (i > 0) {
      diamond += ' '.repeat(2 * i - 1)
      diamond += String.fromCharCode('A'.charCodeAt(0) + i)
    }
    diamond += '\n'
  }

  for (let i = size - 1; i >= 0; i--) {
    diamond += ' '.repeat(size - i)
    diamond += String.fromCharCode('A'.charCodeAt(0) + i)
    if (i > 0) {
      diamond += ' '.repeat(2 * i - 1)
      diamond += String.fromCharCode('A'.charCodeAt(0) + i)
    }
    diamond += '\n'
  }

  return diamond
}
