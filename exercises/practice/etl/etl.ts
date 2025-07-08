export function transform(old: { [key: string]: string[] }): { [key: string]: number } {
  const result: { [key: string]: number } = {}
  
  for (const [score, letters] of Object.entries(old)) {
    const scoreNum = parseInt(score, 10)
    for (const letter of letters) {
      result[letter.toLowerCase()] = scoreNum
    }
  }
  
  return result
}
