export function parse(phrase: string): string {
  return phrase
    .split(/[\s\-_]+/)
    .map(word => word.charAt(0).toUpperCase())
    .join('')
}
