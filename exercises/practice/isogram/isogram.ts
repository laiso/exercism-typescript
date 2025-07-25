export function isIsogram(word: string): boolean {
  const letters = word.toLowerCase().replace(/[^a-z]/g, '')
  const letterSet = new Set(letters)
  return letters.length === letterSet.size
}
