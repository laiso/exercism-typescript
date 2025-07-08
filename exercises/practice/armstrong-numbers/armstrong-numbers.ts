export function isArmstrongNumber(number: number | bigint): boolean {
  const numberStr = number.toString()
  const digits = numberStr.split('').map(digit => BigInt(digit))
  const numDigits = BigInt(digits.length)
  
  const sum = digits.reduce((acc, digit) => acc + digit ** numDigits, 0n)
  
  return sum === BigInt(number)
}
