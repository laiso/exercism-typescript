export function encode(plainText: string): string {
  return processText(plainText, true)
}

export function decode(cipherText: string): string {
  return processText(cipherText, false)
}

function processText(text: string, encode: boolean): string {
  const alphabet = 'abcdefghijklmnopqrstuvwxyz'
  const reverse = 'zyxwvutsrqponmlkjihgfedcba'
  
  let result = ''
  let charCount = 0
  
  for (const char of text.toLowerCase()) {
    if (char >= 'a' && char <= 'z') {
      const index = alphabet.indexOf(char)
      result += reverse[index]
      charCount++
      
      // Add space every 5 characters for encoding
      if (encode && charCount % 5 === 0) {
        result += ' '
      }
    } else if (char >= '0' && char <= '9') {
      result += char
      charCount++
      
      // Add space every 5 characters for encoding
      if (encode && charCount % 5 === 0) {
        result += ' '
      }
    }
    // Ignore spaces and punctuation
  }
  
  // Remove trailing space
  return result.trim()
}
