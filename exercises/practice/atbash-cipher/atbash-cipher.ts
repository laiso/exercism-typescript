export function encode(plainText: string): string {
  const transform = (char: string): string => {
    if (char >= 'a' && char <= 'z') {
      return String.fromCharCode(122 - (char.charCodeAt(0) - 97))
    }
    if (char >= '0' && char <= '9') {
      return char
    }
    return ''
  }
  
  const cleaned = plainText
    .toLowerCase()
    .split('')
    .map(transform)
    .filter(char => char !== '')
    .join('')
  
  // Group into chunks of 5
  const result = []
  for (let i = 0; i < cleaned.length; i += 5) {
    result.push(cleaned.substring(i, i + 5))
  }
  
  return result.join(' ')
}

export function decode(cipherText: string): string {
  const transform = (char: string): string => {
    if (char >= 'a' && char <= 'z') {
      return String.fromCharCode(122 - (char.charCodeAt(0) - 97))
    }
    if (char >= '0' && char <= '9') {
      return char
    }
    return ''
  }
  
  return cipherText
    .replace(/\s/g, '')
    .split('')
    .map(transform)
    .join('')
}
