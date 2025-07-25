export function isPangram(sentence: string): boolean {
  const lowerSentence = sentence.toLowerCase()
  const alphabet = 'abcdefghijklmnopqrstuvwxyz'
  
  for (const letter of alphabet) {
    if (!lowerSentence.includes(letter)) {
      return false
    }
  }
  
  return true
}
