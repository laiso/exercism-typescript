export function parse(phrase: string): string {
  return phrase
    .split(/[\s\-_,]+/) // Split on whitespace, hyphens, underscores, commas
    .map(word => word.replace(/[^a-zA-Z]/g, '')) // Remove non-letters
    .filter(word => word.length > 0) // Filter out empty strings
    .map(word => word[0].toUpperCase()) // Take first letter and capitalize
    .join('')
}
