export function isPangram(sentence: string): boolean {
  const alphabet = 'abcdefghijklmnopqrstuvwxyz'
  const lowerSentence = sentence.toLowerCase()
  
  for (const letter of alphabet) {
    if (!lowerSentence.includes(letter)) {
      return false
    }
  }
  
  return true
}
