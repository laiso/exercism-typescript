export function isIsogram(word: string): boolean {
  const lowerWord = word.toLowerCase()
  const letters = lowerWord.replace(/[^a-z]/g, '')
  
  return letters.length === new Set(letters).size
}
