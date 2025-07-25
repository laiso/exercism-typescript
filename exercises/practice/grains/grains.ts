export const square = (n: number): bigint => {
  if (n < 1 || n > 64) {
    throw new Error('square must be between 1 and 64')
  }
  return 2n ** BigInt(n - 1)
}

export const total = (): bigint => {
  // Total = 2^64 - 1
  return 2n ** 64n - 1n
}
