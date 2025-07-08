export function isArmstrongNumber(number: number | bigint): boolean {
  const numStr = number.toString()
  const numDigits = numStr.length
  
  if (typeof number === 'bigint') {
    let sum = BigInt(0)
    for (const digit of numStr) {
      const digitNum = parseInt(digit, 10)
      sum += BigInt(digitNum) ** BigInt(numDigits)
    }
    return sum === number
  } else {
    let sum = 0
    for (const digit of numStr) {
      const digitNum = parseInt(digit, 10)
      sum += Math.pow(digitNum, numDigits)
    }
    return sum === number
  }
}
