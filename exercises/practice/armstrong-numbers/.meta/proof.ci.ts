export function isArmstrongNumber(number: number): boolean {
  const digits = number.toString().split('').map(Number)
  const numDigits = digits.length
  const sum = digits.reduce((acc, digit) => acc + Math.pow(digit, numDigits), 0)
  return sum === number
}
