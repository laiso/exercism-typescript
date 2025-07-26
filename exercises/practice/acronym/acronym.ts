export function parse(phrase: string): string {
  // Replace hyphens with spaces and remove other punctuation
  const cleaned = phrase.replace(/-/g, ' ').replace(/[^\w\s]/g, '')
  
  // Split into words
  const words = cleaned.split(/\s+/).filter(word => word.length > 0)
  
  // If the first word is all caps (like PHP), return just that word
  if (words.length > 0 && words[0] === words[0].toUpperCase() && words[0].length > 1) {
    return words[0]
  }
  
  // For each word, handle it appropriately
  const acronym = words.map(word => {
    // For camelCase words, split on capital letters
    const parts = word.split(/(?=[A-Z])/).filter(part => part.length > 0)
    
    if (parts.length > 1) {
      return parts.map(part => part.charAt(0).toUpperCase()).join('')
    }
    
    // For regular words, just take the first letter
    return word.charAt(0).toUpperCase()
  }).join('')
  
  return acronym
}
