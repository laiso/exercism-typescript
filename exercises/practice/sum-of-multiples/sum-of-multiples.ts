export function sum(factors: number[], limit: number): number {
  const multiples = new Set<number>()
  
  for (const factor of factors) {
    if (factor > 0) {
      for (let multiple = factor; multiple < limit; multiple += factor) {
        multiples.add(multiple)
      }
    }
  }
  
  return Array.from(multiples).reduce((sum, multiple) => sum + multiple, 0)
}
