export const square = (n: number): bigint => {
  if (n <= 0 || n > 64) {
    throw new Error('Invalid square')
  }
  return BigInt(2) ** BigInt(n - 1)
}

export const total = (): bigint => {
  return BigInt(2) ** BigInt(64) - BigInt(1)
}
