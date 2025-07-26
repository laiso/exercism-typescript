export function isArmstrongNumber(num: number): boolean {
  const digits = num.toString().split('').map(Number)
  const power = digits.length
  const sum = digits.reduce((acc, digit) => acc + Math.pow(digit, power), 0)
  return sum === num
}