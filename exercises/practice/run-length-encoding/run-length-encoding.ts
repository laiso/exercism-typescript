export function encode(input: string): string {
  if (!input) return ''
  
  let result = ''
  let count = 1
  let currentChar = input[0]
  
  for (let i = 1; i < input.length; i++) {
    if (input[i] === currentChar) {
      count++
    } else {
      result += count > 1 ? count + currentChar : currentChar
      currentChar = input[i]
      count = 1
    }
  }
  
  result += count > 1 ? count + currentChar : currentChar
  return result
}

export function decode(input: string): string {
  if (!input) return ''
  
  let result = ''
  let i = 0
  
  while (i < input.length) {
    let count = ''
    
    // Read digits for count
    while (i < input.length && /\d/.test(input[i])) {
      count += input[i]
      i++
    }
    
    // Get the character
    if (i < input.length) {
      const char = input[i]
      const repeatCount = count ? parseInt(count, 10) : 1
      result += char.repeat(repeatCount)
      i++
    }
  }
  
  return result
}
