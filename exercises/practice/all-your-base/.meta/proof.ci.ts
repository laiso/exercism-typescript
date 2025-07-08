export function convert(
  digits: number[],
  inputBase: number,
  outputBase: number
): number[] {
  if (inputBase < 2) {
    throw new Error('Input base must be >= 2')
  }
  if (outputBase < 2) {
    throw new Error('Output base must be >= 2')
  }
  if (digits.some(digit => digit < 0 || digit >= inputBase)) {
    throw new Error('All digits must satisfy 0 <= d < input base')
  }
  
  if (digits.length === 0) {
    throw new Error('Input has wrong format')
  }
  
  let decimal = 0
  for (const digit of digits) {
    decimal = decimal * inputBase + digit
  }
  
  if (decimal === 0) {
    return [0]
  }
  
  const result: number[] = []
  while (decimal > 0) {
    result.unshift(decimal % outputBase)
    decimal = Math.floor(decimal / outputBase)
  }
  
  return result
}
