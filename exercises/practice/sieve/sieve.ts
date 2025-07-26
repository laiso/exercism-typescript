export function primes(limit: number): number[] {
  if (limit < 2) return []
  
  const sieve = new Array(limit + 1).fill(true)
  sieve[0] = sieve[1] = false
  
  for (let i = 2; i * i <= limit; i++) {
    if (sieve[i]) {
      for (let j = i * i; j <= limit; j += i) {
        sieve[j] = false
      }
    }
  }
  
  return sieve.map((isPrime, num) => isPrime ? num : -1)
              .filter(num => num !== -1)
}
