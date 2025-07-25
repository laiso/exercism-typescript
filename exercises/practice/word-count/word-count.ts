export function count(phrase: string): Map<string, number> {
  const words = phrase
    .toLowerCase()
    .split(/[^a-z0-9']+/)
    .map(word => word.replace(/^'|'$/g, '')) // Remove leading/trailing apostrophes
    .filter(word => word.length > 0)
  
  const wordCount = new Map<string, number>()
  
  for (const word of words) {
    wordCount.set(word, (wordCount.get(word) || 0) + 1)
  }
  
  return wordCount
}
