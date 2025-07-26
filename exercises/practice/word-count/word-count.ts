export function count(phrase: string): Map<string, number> {
  const words = phrase
    .toLowerCase()
    .replace(/[^\w\s']/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .split(' ')
    .filter(word => word.length > 0)
    .map(word => word.replace(/^'|'$/g, ''))
    .filter(word => word.length > 0)
  
  const wordCount = new Map<string, number>()
  
  for (const word of words) {
    wordCount.set(word, (wordCount.get(word) || 0) + 1)
  }
  
  return wordCount
}
