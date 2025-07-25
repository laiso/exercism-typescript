export function encode(text: string): string {
  if (text === '') return ''
  
  let result = ''
  let count = 1
  let current = text[0]
  
  for (let i = 1; i < text.length; i++) {
    if (text[i] === current) {
      count++
    } else {
      // Add the encoded segment
      result += count === 1 ? current : count + current
      current = text[i]
      count = 1
    }
  }
  
  // Add the final segment
  result += count === 1 ? current : count + current
  
  return result
}

export function decode(text: string): string {
  if (text === '') return ''
  
  let result = ''
  let i = 0
  
  while (i < text.length) {
    let count = ''
    
    // Collect digits
    while (i < text.length && /\d/.test(text[i])) {
      count += text[i]
      i++
    }
    
    // Get the character
    if (i < text.length) {
      const char = text[i]
      const repeatCount = count === '' ? 1 : parseInt(count)
      result += char.repeat(repeatCount)
      i++
    }
  }
  
  return result
}
