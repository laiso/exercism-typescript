export function isPangram(sentence: string): boolean {
  const lowerSentence = sentence.toLowerCase()
  const alphabet = 'abcdefghijklmnopqrstuvwxyz'
  
  return alphabet.split('').every(letter => lowerSentence.includes(letter))
}
