function atbashChar(char: string): string {
  if (char >= 'a' && char <= 'z') {
    const offset = char.charCodeAt(0) - 'a'.charCodeAt(0)
    return String.fromCharCode('z'.charCodeAt(0) - offset)
  }
  if (char >= '0' && char <= '9') {
    return char
  }
  return ''
}

export function encode(plainText: string): string {
  // Convert to lowercase, filter alphanumeric, apply cipher
  const processed = plainText
    .toLowerCase()
    .split('')
    .map(atbashChar)
    .filter(char => char !== '')
    .join('')

  // Group into chunks of 5
  const chunks: string[] = []
  for (let i = 0; i < processed.length; i += 5) {
    chunks.push(processed.slice(i, i + 5))
  }
  
  return chunks.join(' ')
}

export function decode(cipherText: string): string {
  // Remove spaces and apply cipher
  return cipherText
    .replace(/\s/g, '')
    .split('')
    .map(atbashChar)
    .join('')
}
