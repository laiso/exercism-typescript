export function transform(old: { [key: string]: string[] }): { [key: string]: number } {
  const result: { [key: string]: number } = {}
  
  for (const [scoreStr, letters] of Object.entries(old)) {
    const score = parseInt(scoreStr, 10)
    for (const letter of letters) {
      result[letter.toLowerCase()] = score
    }
  }
  
  return result
}
