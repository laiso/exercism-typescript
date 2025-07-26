export function parse(phrase: string): string {
  const normalized = phrase
    .replace(/[^A-Za-z\s-]/g, '')
    .replace(/-/g, ' ')
    .split(/\s+/)
    .filter((w) => w.length > 0)

  const letters: string[] = []
  for (const word of normalized) {
    letters.push(word[0])
    for (let i = 1; i < word.length; i++) {
      const char = word[i]
      const prev = word[i - 1]
      if (char >= 'A' && char <= 'Z' && !(prev >= 'A' && prev <= 'Z')) {
        letters.push(char)
      }
    }
  }

  return letters.join('').toUpperCase()
}
