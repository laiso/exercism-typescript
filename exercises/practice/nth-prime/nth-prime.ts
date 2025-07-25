export function nth(n: number): number {
  if (n < 1) {
    throw new Error('Prime is not possible')
  }
  
  const isPrime = (num: number): boolean => {
    if (num < 2) return false
    if (num === 2) return true
    if (num % 2 === 0) return false
    
    for (let i = 3; i * i <= num; i += 2) {
      if (num % i === 0) return false
    }
    return true
  }
  
  let count = 0
  let candidate = 2
  
  while (count < n) {
    if (isPrime(candidate)) {
      count++
      if (count === n) return candidate
    }
    candidate++
  }
  
  return candidate
}
