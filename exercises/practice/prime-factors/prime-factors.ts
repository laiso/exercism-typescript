export function calculatePrimeFactors(number: number): number[] {
  const factors: number[] = []
  let n = number
  let divisor = 2
  
  while (divisor * divisor <= n) {
    while (n % divisor === 0) {
      factors.push(divisor)
      n = n / divisor
    }
    divisor++
  }
  
  if (n > 1) {
    factors.push(n)
  }
  
  return factors
}
