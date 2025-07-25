export function isArmstrongNumber(number: number | bigint): boolean {
  const numStr = number.toString()
  const digits = numStr.split('').map(d => BigInt(d))
  const power = BigInt(digits.length)
  
  const sum = digits.reduce((acc, digit) => acc + digit ** power, 0n)
  
  return sum === BigInt(number)
}
