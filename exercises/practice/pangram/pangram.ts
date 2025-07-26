const ALPHABET = 'abcdefghijklmnopqrstuvwxyz'

export function isPangram(sentence: string): boolean {
  const letters = new Set<string>()
  for (const char of sentence.toLowerCase()) {
    if (ALPHABET.includes(char)) {
      letters.add(char)
    }
  }
  return letters.size === ALPHABET.length
}
