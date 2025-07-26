export function encode(text: string): string {
  return text.replace(/([a-zA-Z\s])\1+/g, (match, char) => `${match.length}${char}`)
}

export function decode(text: string): string {
  return text.replace(/(\d+)([a-zA-Z\s])/g, (_, count, char) => char.repeat(Number(count)))
}
