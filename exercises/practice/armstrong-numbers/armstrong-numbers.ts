export function isArmstrongNumber(number: number | bigint): boolean {
  const numStr = number.toString()
  const numDigits = numStr.length
  
  let sum: number | bigint = typeof number === 'bigint' ? BigInt(0) : 0
  
  for (const digit of numStr) {
    const digitNum = parseInt(digit, 10)
    
    if (typeof number === 'bigint') {
      // Use BigInt arithmetic for BigInt numbers
      let power = BigInt(1)
      for (let i = 0; i < numDigits; i++) {
        power *= BigInt(digitNum)
      }
      sum = (sum as bigint) + power
    } else {
      // Use regular arithmetic for regular numbers
      sum = (sum as number) + Math.pow(digitNum, numDigits)
    }
  }
  
  return sum === number
}
