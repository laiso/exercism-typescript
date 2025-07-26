export function transform(old: { [key: string]: string[] }): { [key: string]: number } {
  const newScores: { [key: string]: number } = {}
  for (const score in old) {
    for (const letter of old[score]) {
      newScores[letter.toLowerCase()] = Number(score)
    }
  }
  return newScores
}
