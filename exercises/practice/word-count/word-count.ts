export function count(phrase: string): Map<string, number> {
  const wordCount = new Map<string, number>()
  
  // Split by whitespace and punctuation, but preserve apostrophes in contractions
  const words = phrase.toLowerCase().match(/\b[\w']+\b/g) || []
  
  for (const word of words) {
    const count = wordCount.get(word) || 0
    wordCount.set(word, count + 1)
  }
  
  return wordCount
}
