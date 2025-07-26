export function isIsogram(phrase: string): boolean {
  const cleaned = phrase.toLowerCase().replace(/[\s-]/g, '')
  return new Set(cleaned).size === cleaned.length
}
