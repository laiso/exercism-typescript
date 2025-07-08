export function parse(phrase: string): string {
  // Replace hyphens with spaces and remove other punctuation
  const cleaned = phrase.replace(/[^a-zA-Z\s-]/g, '').replace(/-/g, ' ')
  
  // Split into words and get first letter of each
  const words = cleaned.split(/\s+/).filter(word => word.length > 0)
  
  // Take first letter of each word and join
  return words.map(word => {
    // Handle camelCase words by splitting on capital letters
    const parts = word.split(/(?=[A-Z])/)
    return parts.map(part => part.charAt(0).toUpperCase()).join('')
  }).join('')
}
