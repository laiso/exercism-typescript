export class SimpleCipher {
  private _key: string

  constructor(key?: string) {
    if (key === undefined) {
      this._key = this.generateRandomKey()
    } else {
      if (!this.isValidKey(key)) {
        throw new Error('Bad key')
      }
      this._key = key
    }
  }

  private generateRandomKey(): string {
    const letters = 'abcdefghijklmnopqrstuvwxyz'
    let key = ''
    for (let i = 0; i < 100; i++) {
      key += letters[Math.floor(Math.random() * letters.length)]
    }
    return key
  }

  private isValidKey(key: string): boolean {
    return key.length > 0 && /^[a-z]+$/.test(key)
  }

  encode(plaintext: string): string {
    let result = ''
    for (let i = 0; i < plaintext.length; i++) {
      const plainChar = plaintext[i]
      const keyChar = this._key[i % this._key.length]
      const shift = keyChar.charCodeAt(0) - 'a'.charCodeAt(0)
      const encodedChar = String.fromCharCode(((plainChar.charCodeAt(0) - 'a'.charCodeAt(0) + shift) % 26) + 'a'.charCodeAt(0))
      result += encodedChar
    }
    return result
  }

  decode(ciphertext: string): string {
    let result = ''
    for (let i = 0; i < ciphertext.length; i++) {
      const cipherChar = ciphertext[i]
      const keyChar = this._key[i % this._key.length]
      const shift = keyChar.charCodeAt(0) - 'a'.charCodeAt(0)
      const decodedChar = String.fromCharCode(((cipherChar.charCodeAt(0) - 'a'.charCodeAt(0) - shift + 26) % 26) + 'a'.charCodeAt(0))
      result += decodedChar
    }
    return result
  }

  get key(): string {
    return this._key
  }
}
