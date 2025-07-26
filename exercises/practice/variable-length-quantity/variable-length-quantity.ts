export function encode(numbers: number[]): number[] {
  const result: number[] = []
  
  for (const num of numbers) {
    const bytes: number[] = []
    let value = num
    
    if (value === 0) {
      bytes.push(0)
    } else {
      while (value > 0) {
        bytes.unshift(value & 0x7F)
        value >>>= 7
      }
    }
    
    for (let i = 0; i < bytes.length - 1; i++) {
      bytes[i] |= 0x80
    }
    
    result.push(...bytes)
  }
  
  return result
}

export function decode(bytes: number[]): number[] {
  const result: number[] = []
  let current = 0
  
  for (let i = 0; i < bytes.length; i++) {
    const byte = bytes[i]
    
    current = (current << 7) | (byte & 0x7F)
    
    if ((byte & 0x80) === 0) {
      result.push(current >>> 0)
      current = 0
    }
  }
  
  if (bytes.length > 0 && (bytes[bytes.length - 1] & 0x80) !== 0) {
    throw new Error('Incomplete sequence')
  }
  
  return result
}
