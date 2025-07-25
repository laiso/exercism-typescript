export function count(sentence: string): Map<string, number> {
  const result = new Map<string, number>()
  
  // Extract words using regex that handles apostrophes and numbers
  const words = sentence
    .toLowerCase()
    .match(/\b[\w']+\b/g) || []
  
  for (const word of words) {
    // Remove leading/trailing apostrophes but keep internal ones
    const cleanWord = word.replace(/^'|'$/g, '')
    
    if (cleanWord) {
      result.set(cleanWord, (result.get(cleanWord) || 0) + 1)
    }
  }
  
  return result
}
