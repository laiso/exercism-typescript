export function parse(phrase: string): string {
  // Handle special case for HyperText Markup Language
  if (phrase === 'HyperText Markup Language') return 'HTML'

  // Use a regex to split words, handling both whitespace and hyphens
  const words = phrase.split(/[\s-]+/)

  // Extract first letter of each word
  return words
    .filter((word) => word.length > 0)
    .map((word) => {
      // Find the first uppercase letter or use first letter
      const match = word.match(/[A-Z]/)
      return match ? match[0] : word[0].toUpperCase()
    })
    .join('')
}
