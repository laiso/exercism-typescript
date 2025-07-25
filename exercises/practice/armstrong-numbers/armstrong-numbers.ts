export function isArmstrongNumber(number: number | bigint): boolean {
  const numStr = number.toString()
  const digits = numStr.split('').map(d => parseInt(d, 10))
  const numDigits = digits.length
  
  const sum = digits.reduce((acc, digit) => {
    if (typeof number === 'bigint') {
      return acc + BigInt(digit) ** BigInt(numDigits)
    } else {
      return acc + Math.pow(digit, numDigits)
    }
  }, typeof number === 'bigint' ? BigInt(0) : 0)
  
  if (typeof number === 'bigint') {
    return sum === number
  } else {
    return sum === number
  }
}
