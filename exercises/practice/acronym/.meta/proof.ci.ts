export function parse(phrase: string): string {
  return phrase
    .split(/[\s-_]+/)
    .map(word => word.replace(/[^a-zA-Z]/g, ''))
    .filter(word => word.length > 0)
    .map(word => word[0].toUpperCase())
    .join('')
}
