export function parse(phrase: string): string {
  // Split on spaces and hyphens, then filter out empty strings
  const words = phrase.split(/[\s-]+/).filter(word => word.length > 0)
  
  // Take the first letter of each word, convert to uppercase
  return words
    .map(word => word.charAt(0).toUpperCase())
    .join('')
}
