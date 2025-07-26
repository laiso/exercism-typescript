export function encode(plainText: string): string {
  return processText(plainText, true)
}

export function decode(cipherText: string): string {
  return processText(cipherText, false)
}

function processText(text: string, isEncoding: boolean): string {
  const alphabet = 'abcdefghijklmnopqrstuvwxyz'
  const reversed = 'zyxwvutsrqponmlkjihgfedcba'
  
  let result = ''
  let groupCount = 0
  
  for (const char of text.toLowerCase()) {
    if (char.match(/[a-z]/)) {
      const index = alphabet.indexOf(char)
      const encodedChar = reversed[index]
      result += encodedChar
      groupCount++
      
      // Add space every 5 characters for encoding
      if (isEncoding && groupCount % 5 === 0) {
        result += ' '
      }
    } else if (char.match(/[0-9]/)) {
      result += char
      groupCount++
      
      // Add space every 5 characters for encoding
      if (isEncoding && groupCount % 5 === 0) {
        result += ' '
      }
    }
    // Ignore spaces, punctuation, etc.
  }
  
  // Remove trailing space if present
  return result.trim()
}
