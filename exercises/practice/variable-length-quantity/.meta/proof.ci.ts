export function encode(numbers: number[]): number[] {
  const result: number[] = []
  
  for (const num of numbers) {
    const bytes: number[] = []
    let value = num
    
    bytes.push(value & 0x7f)
    value >>= 7
    
    while (value > 0) {
      bytes.push((value & 0x7f) | 0x80)
      value >>= 7
    }
    
    result.push(...bytes.reverse())
  }
  
  return result
}

export function decode(bytes: number[]): number[] {
  const result: number[] = []
  let current = 0
  
  for (let i = 0; i < bytes.length; i++) {
    const byte = bytes[i]
    current = (current << 7) | (byte & 0x7f)
    
    if ((byte & 0x80) === 0) {
      result.push(current)
      current = 0
    } else if (i === bytes.length - 1) {
      throw new Error('Incomplete sequence')
    }
  }
  
  return result
}
