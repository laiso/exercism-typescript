export function count(phrase: string): { [key: string]: number } {
  const words = phrase
    .toLowerCase()
    .match(/\b[\w']+\b/g) || []
  
  const result: { [key: string]: number } = {}
  
  for (const word of words) {
    const cleanWord = word.replace(/^'|'$/g, '')
    result[cleanWord] = (result[cleanWord] || 0) + 1
  }
  
  return result
}
