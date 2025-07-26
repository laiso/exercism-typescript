function isPrime(n: number): boolean {
  if (n <= 1) {
    return false
  }
  for (let i = 2; i * i <= n; i++) {
    if (n % i === 0) {
      return false
    }
  }
  return true
}

export function nth(n: number): number {
  if (n === 0) {
    throw new Error('Prime is not possible')
  }

  let count = 0
  let num = 1
  while (count < n) {
    num++
    if (isPrime(num)) {
      count++
    }
  }
  return num
}
