export function sum(multiples: number[], limit: number): number {
  const uniqueMultiples = new Set<number>()
  
  for (const multiple of multiples) {
    if (multiple > 0) {
      for (let i = multiple; i < limit; i += multiple) {
        uniqueMultiples.add(i)
      }
    }
  }
  
  return Array.from(uniqueMultiples).reduce((sum, num) => sum + num, 0)
}
