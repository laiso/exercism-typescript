export function sum(factors: number[], limit: number): number {
  const multiples = new Set<number>()

  for (const factor of factors) {
    if (factor === 0) continue
    for (let i = factor; i < limit; i += factor) {
      multiples.add(i)
    }
  }

  return Array.from(multiples).reduce((acc, val) => acc + val, 0)
}
