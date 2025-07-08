export function encode(input: string): string {
  return input.replace(/(.)\1+/g, (match, char) => match.length + char)
}

export function decode(input: string): string {
  return input.replace(/(\d+)(.)/g, (_, count, char) => char.repeat(parseInt(count)))
}
