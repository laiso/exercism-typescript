export class SimpleCipher {
  public readonly key: string

  constructor(key?: string) {
    if (key) {
      this.key = key
    } else {
      // Generate a random key of at least 100 lowercase letters
      this.key = this.generateRandomKey(100)
    }
  }

  encode(plaintext: string): string {
    let result = ''
    for (let i = 0; i < plaintext.length; i++) {
      const plaintextChar = plaintext[i]
      const keyChar = this.key[i % this.key.length]
      
      const shift = keyChar.charCodeAt(0) - 'a'.charCodeAt(0)
      const encodedCharCode = ((plaintextChar.charCodeAt(0) - 'a'.charCodeAt(0) + shift) % 26) + 'a'.charCodeAt(0)
      
      result += String.fromCharCode(encodedCharCode)
    }
    return result
  }

  decode(ciphertext: string): string {
    let result = ''
    for (let i = 0; i < ciphertext.length; i++) {
      const ciphertextChar = ciphertext[i]
      const keyChar = this.key[i % this.key.length]
      
      const shift = keyChar.charCodeAt(0) - 'a'.charCodeAt(0)
      const decodedCharCode = ((ciphertext.charCodeAt(i) - 'a'.charCodeAt(0) - shift + 26) % 26) + 'a'.charCodeAt(0)
      
      result += String.fromCharCode(decodedCharCode)
    }
    return result
  }

  private generateRandomKey(length: number): string {
    let key = ''
    for (let i = 0; i < length; i++) {
      key += String.fromCharCode(Math.floor(Math.random() * 26) + 'a'.charCodeAt(0))
    }
    return key
  }
}
