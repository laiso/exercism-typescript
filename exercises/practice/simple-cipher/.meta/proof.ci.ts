export class SimpleCipher {
  private key: string

  constructor(key?: string) {
    if (key) {
      if (!/^[a-z]+$/.test(key)) {
        throw new Error('Bad key')
      }
      this.key = key
    } else {
      this.key = this.generateRandomKey()
    }
  }

  private generateRandomKey(): string {
    const length = 100
    let result = ''
    for (let i = 0; i < length; i++) {
      result += String.fromCharCode(97 + Math.floor(Math.random() * 26))
    }
    return result
  }

  encode(plaintext: string): string {
    return this.shift(plaintext, 1)
  }

  decode(ciphertext: string): string {
    return this.shift(ciphertext, -1)
  }

  private shift(text: string, direction: number): string {
    let result = ''
    for (let i = 0; i < text.length; i++) {
      const textChar = text[i]
      const keyChar = this.key[i % this.key.length]
      const shift = (keyChar.charCodeAt(0) - 97) * direction
      const newCharCode = ((textChar.charCodeAt(0) - 97 + shift + 26) % 26) + 97
      result += String.fromCharCode(newCharCode)
    }
    return result
  }
}
