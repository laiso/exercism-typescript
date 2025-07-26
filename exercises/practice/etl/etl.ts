export function transform(legacy: { [key: number]: string[] }): { [key: string]: number } {
  const result: { [key: string]: number } = {}
  
  for (const [score, letters] of Object.entries(legacy)) {
    const numericScore = parseInt(score)
    for (const letter of letters) {
      result[letter.toLowerCase()] = numericScore
    }
  }
  
  return result
}
