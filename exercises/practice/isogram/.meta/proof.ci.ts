export function isIsogram(word: string): boolean {
  const normalized = word.toLowerCase().replace(/[-\s]/g, '')
  const seen = new Set<string>()
  
  for (const char of normalized) {
    if (seen.has(char)) {
      return false
    }
    seen.add(char)
  }
  
  return true
}
