const PLAIN = 'abcdefghijklmnopqrstuvwxyz'
const CIPHER = 'zyxwvutsrqponmlkjihgfedcba'

function atbash(text: string, from: string, to: string): string {
  return text
    .toLowerCase()
    .split('')
    .filter((char) => from.includes(char) || (char >= '0' && char <= '9'))
    .map((char) => {
      const index = from.indexOf(char)
      return index === -1 ? char : to[index]
    })
    .join('')
}

export function encode(plainText: string): string {
  const encoded = atbash(plainText, PLAIN, CIPHER)
  return encoded.replace(/(.{5})/g, '$1 ').trim()
}

export function decode(cipherText: string): string {
  return atbash(cipherText, CIPHER, PLAIN)
}
