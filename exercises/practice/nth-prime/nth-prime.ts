export function nth(n: number): number {
  if (n < 1) {
    throw new Error('Prime is not possible')
  }
  
  const primes: number[] = []
  let candidate = 2
  
  while (primes.length < n) {
    let isPrime = true
    
    for (const prime of primes) {
      if (prime * prime > candidate) break
      if (candidate % prime === 0) {
        isPrime = false
        break
      }
    }
    
    if (isPrime) {
      primes.push(candidate)
    }
    
    candidate++
  }
  
  return primes[n - 1]
}
