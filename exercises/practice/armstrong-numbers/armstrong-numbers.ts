export function isArmstrongNumber(n: number | bigint): boolean {
  const s = String(n)
  const numDigits = BigInt(s.length)
  let sum = BigInt(0)
  for (const digit of s) {
    sum += BigInt(digit) ** numDigits
  }
  return sum === BigInt(n)
}
