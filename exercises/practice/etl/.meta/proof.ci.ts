export function transform(old: { [key: number]: string[] }): { [key: string]: number } {
  const result: { [key: string]: number } = {}
  
  for (const [points, letters] of Object.entries(old)) {
    const pointValue = parseInt(points)
    for (const letter of letters) {
      result[letter.toLowerCase()] = pointValue
    }
  }
  
  return result
}
