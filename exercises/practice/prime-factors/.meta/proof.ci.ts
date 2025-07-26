export function calculatePrimeFactors(num: number): number[] {
  const factors: number[] = []
  let n = num
  
  for (let factor = 2; factor * factor <= n; factor++) {
    while (n % factor === 0) {
      factors.push(factor)
      n = n / factor
    }
  }
  
  if (n > 1) {
    factors.push(n)
  }
  
  return factors
}