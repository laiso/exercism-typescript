export function convert(
  digits: number[],
  inputBase: number,
  outputBase: number
): number[] {
  if (inputBase < 2) {
    throw new Error('Wrong input base')
  }
  if (outputBase < 2 || !Number.isInteger(outputBase)) {
    throw new Error('Wrong output base')
  }
  if (digits.length === 0) {
    throw new Error('Input has wrong format')
  }
  if (digits.some(digit => digit < 0 || digit >= inputBase)) {
    throw new Error('Input has wrong format')
  }
  
  if (digits.length > 1 && digits[0] === 0) {
    throw new Error('Input has wrong format')
  }
  if (digits.length > 1 && digits.every(digit => digit === 0)) {
    throw new Error('Input has wrong format')
  }
  
  let decimal = 0
  for (let i = 0; i < digits.length; i++) {
    decimal += digits[i] * Math.pow(inputBase, digits.length - 1 - i)
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
