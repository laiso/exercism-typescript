export function transform(old: { [key: string]: string[] }): { [key: string]: number } {
  const result: { [key: string]: number } = {}
  
  for (const [score, letters] of Object.entries(old)) {
    for (const letter of letters) {
      result[letter.toLowerCase()] = parseInt(score)
    }
  }
  
  return result
}
