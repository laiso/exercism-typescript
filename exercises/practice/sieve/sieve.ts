export function primes(limit: number): number[] {
  if (limit < 2) return []
  
  const isPrime = new Array(limit + 1).fill(true)
  isPrime[0] = isPrime[1] = false
  
  for (let i = 2; i * i <= limit; i++) {
    if (isPrime[i]) {
      for (let j = i * i; j <= limit; j += i) {
        isPrime[j] = false
      }
    }
  }
  
  const result: number[] = []
  for (let i = 2; i <= limit; i++) {
    if (isPrime[i]) {
      result.push(i)
    }
  }
  
  return result
}
