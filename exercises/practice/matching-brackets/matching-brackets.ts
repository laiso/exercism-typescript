export function isPaired(input: string): boolean {
  const stack: string[] = []
  const bracketPairs: { [key: string]: string } = {
    '(': ')',
    '[': ']',
    '{': '}',
  }

  for (const char of input) {
    if (bracketPairs[char]) {
      stack.push(char)
    } else if (Object.values(bracketPairs).includes(char)) {
      if (stack.length === 0 || bracketPairs[stack.pop()!] !== char) {
        return false
      }
    }
  }

  return stack.length === 0
}
