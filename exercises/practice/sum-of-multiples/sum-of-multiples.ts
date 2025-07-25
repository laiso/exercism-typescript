export function sum(multiples: number[], limit: number): number {
  const uniqueMultiples = new Set<number>()
  
  for (const multiple of multiples) {
    if (multiple === 0) continue // Skip 0 as it doesn't generate meaningful multiples
    
    for (let i = multiple; i < limit; i += multiple) {
      uniqueMultiples.add(i)
    }
  }
  
  return Array.from(uniqueMultiples).reduce((total, num) => total + num, 0)
}
