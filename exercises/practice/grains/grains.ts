export const square = (n: number): bigint => {
  if (n <= 0 || n > 64) {
    throw new Error('Square must be between 1 and 64')
  }
  
  // 2^(n-1) を計算
  return BigInt(2) ** BigInt(n - 1)
}

export const total = (): bigint => {
  // 全体の穀物数は 2^64 - 1
  return BigInt(2) ** BigInt(64) - BigInt(1)
}
