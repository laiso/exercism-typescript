export function isArmstrongNumber(number: number | bigint): boolean {
  const numStr = number.toString()
  const digits = numStr.split('').map(Number)
  const numDigits = digits.length
  
  if (typeof number === 'bigint') {
    const sum = digits.reduce((acc, digit) => acc + BigInt(digit) ** BigInt(numDigits), 0n)
    return sum === number
  } else {
    const sum = digits.reduce((acc, digit) => acc + Math.pow(digit, numDigits), 0)
    return sum === number
  }
}
