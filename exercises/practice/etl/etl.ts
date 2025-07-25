export function transform(old: { [key: string]: string[] }): { [key: string]: number } {
  const result: { [key: string]: number } = {}
  
  for (const scoreStr in old) {
    const score = parseInt(scoreStr, 10)
    const letters = old[scoreStr]
    for (const letter of letters) {
      result[letter.toLowerCase()] = score
    }
  }
  
  return result
}
