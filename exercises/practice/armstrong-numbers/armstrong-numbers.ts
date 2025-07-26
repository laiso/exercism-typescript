export function isArmstrongNumber(value: number | bigint): boolean {
  const digits = value.toString()
  const power = BigInt(digits.length)
  let sum = 0n
  for (const ch of digits) {
    const digit = BigInt(ch)
    sum += digit ** power
  }
  return sum === BigInt(value)
}
