export function parse(phrase: string): string {
  return (
    phrase
      .split(/[\s-]+/)
      .map((word) => word[0])
      .join('')
      .toUpperCase()
  )
}
