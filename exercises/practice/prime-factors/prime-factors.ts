export function calculatePrimeFactors(num: number): number[] {
  if (num <= 1) {
    return []
  }
  
  const factors: number[] = []
  let n = num
  
  // Check for factor 2
  while (n % 2 === 0) {
    factors.push(2)
    n = n / 2
  }
  
  // Check for odd factors from 3 onwards
  for (let i = 3; i * i <= n; i += 2) {
    while (n % i === 0) {
      factors.push(i)
      n = n / i
    }
  }
  
  // If n is still greater than 1, then it's a prime factor
  if (n > 1) {
    factors.push(n)
  }
  
  return factors
}
