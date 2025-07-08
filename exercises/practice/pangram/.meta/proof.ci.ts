export function isPangram(sentence: string): boolean {
  const alphabet = 'abcdefghijklmnopqrstuvwxyz'
  const normalized = sentence.toLowerCase()
  
  for (const letter of alphabet) {
    if (!normalized.includes(letter)) {
      return false
    }
  }
  
  return true
}
