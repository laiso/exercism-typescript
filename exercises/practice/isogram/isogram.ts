export function isIsogram(word: string): boolean {
  const letters = word.toLowerCase().replace(/[^a-z]/g, '')
  return letters.length === new Set(letters).size
}
