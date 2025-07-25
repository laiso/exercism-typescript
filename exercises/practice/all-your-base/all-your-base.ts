export function convert(
  digits: number[],
  inputBase: number,
  outputBase: number
): number[] {
  // Validate input
  if (inputBase < 2 || outputBase < 2) {
    throw new Error('Base must be at least 2')
  }
  
  if (digits.length === 0) {
    return [0]
  }
  
  // Check for invalid digits
  for (const digit of digits) {
    if (digit < 0 || digit >= inputBase) {
      throw new Error('Invalid digit for the given base')
    }
  }
  
  // Convert from input base to decimal
  let decimalValue = 0
  for (const digit of digits) {
    decimalValue = decimalValue * inputBase + digit
  }
  
  // Handle zero case
  if (decimalValue === 0) {
    return [0]
  }
  
  // Convert from decimal to output base
  const result: number[] = []
  while (decimalValue > 0) {
    result.unshift(decimalValue % outputBase)
    decimalValue = Math.floor(decimalValue / outputBase)
  }
  
  return result
}
