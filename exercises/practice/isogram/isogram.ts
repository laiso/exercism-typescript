export function isIsogram(word: string): boolean {
  const normalizedWord = word.toLowerCase()
  const seenLetters = new Set<string>()
  
  for (const char of normalizedWord) {
    if (char >= 'a' && char <= 'z') {
      if (seenLetters.has(char)) {
        return false
      }
      seenLetters.add(char)
    }
  }
  
  return true
}
