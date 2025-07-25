export function encode(numbers: number[]): number[] {
  const result: number[] = []
  
  for (const num of numbers) {
    const bytes: number[] = []
    let value = num
    
    // Extract 7-bit groups
    bytes.push(value & 0x7f)
    value >>>= 7
    
    while (value > 0) {
      bytes.push((value & 0x7f) | 0x80)
      value >>>= 7
    }
    
    // Reverse and add to result
    result.push(...bytes.reverse())
  }
  
  return result
}

export function decode(bytes: number[]): number[] {
  const result: number[] = []
  let current = 0
  
  for (const byte of bytes) {
    current = (current << 7) | (byte & 0x7f)
    
    // If MSB is 0, this is the last byte of the number
    if ((byte & 0x80) === 0) {
      result.push(current)
      current = 0
    }
  }
  
  // If we end with an incomplete number, that's an error
  if (current !== 0) {
    throw new Error('Incomplete sequence')
  }
  
  return result
}
