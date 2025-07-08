export function encode(plainText: string): string {
  const alphabet = 'abcdefghijklmnopqrstuvwxyz'
  const cipher = 'zyxwvutsrqponmlkjihgfedcba'
  
  const normalized = plainText.toLowerCase().replace(/[^a-z0-9]/g, '')
  let encoded = ''
  
  for (const char of normalized) {
    if (char >= 'a' && char <= 'z') {
      const index = alphabet.indexOf(char)
      encoded += cipher[index]
    } else {
      encoded += char
    }
  }
  
  return encoded.match(/.{1,5}/g)?.join(' ') || ''
}

export function decode(cipherText: string): string {
  const alphabet = 'abcdefghijklmnopqrstuvwxyz'
  const cipher = 'zyxwvutsrqponmlkjihgfedcba'
  
  const normalized = cipherText.replace(/\s/g, '')
  let decoded = ''
  
  for (const char of normalized) {
    if (char >= 'a' && char <= 'z') {
      const index = cipher.indexOf(char)
      decoded += alphabet[index]
    } else {
      decoded += char
    }
  }
  
  return decoded
}
