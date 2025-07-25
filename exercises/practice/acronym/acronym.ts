export function parse(phrase: string): string {
  return phrase
    .split(/[\s\-,.:;!?_]+/)
    .filter(word => word.length > 0)
    .map(word => word[0].toUpperCase())
    .join('')
}
