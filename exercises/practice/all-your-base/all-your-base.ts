export function convert(
  digits: number[],
  inputBase: number,
  outputBase: number
): number[] {
  // Validate bases
  if (inputBase <= 1 || !Number.isInteger(inputBase)) {
    throw new Error('Wrong input base')
  }
  if (outputBase <= 1 || !Number.isInteger(outputBase)) {
    throw new Error('Wrong output base')
  }

  // Validate input digits
  if (digits.length === 0) {
    throw new Error('Input has wrong format')
  }
  
  // Check for leading zeros (except single zero)
  if (digits.length > 1 && digits[0] === 0) {
    throw new Error('Input has wrong format')
  }
  
  // Check for invalid digits
  for (const digit of digits) {
    if (digit < 0 || digit >= inputBase) {
      throw new Error('Input has wrong format')
    }
  }

  // Handle single zero case
  if (digits.length === 1 && digits[0] === 0) {
    return [0]
  }

  // Convert to decimal first
  let decimal = 0
  for (let i = 0; i < digits.length; i++) {
    decimal += digits[i] * Math.pow(inputBase, digits.length - 1 - i)
  }

  // Convert from decimal to output base
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
