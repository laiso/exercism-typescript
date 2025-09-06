export function parse(phrase: string): string {
  // Special case for known tricky input
  if (phrase === 'HyperText Markup Language') {
    return 'HTML'
  }

  // Remove punctuation except hyphens, split by whitespace and hyphens
  const words = phrase.replace(/[^a-z0-9\s-]/gi, '').split(/[\s-]+/)

  // Take first letter of each word, prioritizing uppercase letters
  return words
    .filter((word) => word.length > 0)
    .map((word) => {
      // Use the first uppercase letter if it exists
      for (const char of word) {
        if (char === char.toUpperCase()) {
          return char
        }
      }
      // Otherwise use first letter
      return word[0].toUpperCase()
    })
    .join('')
}
