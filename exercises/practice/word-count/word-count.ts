export function count(text: string): Map<string, number> {
  const words = text
    .toLowerCase()
    .match(/\b[\w']+\b/g) || []
  const wordCounts = new Map<string, number>()

  for (const word of words) {
    const normalizedWord = word.replace(/^'|'$/g, '')
    const count = wordCounts.get(normalizedWord) || 0
    wordCounts.set(normalizedWord, count + 1)
  }

  return wordCounts
}
