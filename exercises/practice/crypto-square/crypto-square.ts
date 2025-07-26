export class Crypto {
  private plainText: string

  constructor(plainText: string) {
    this.plainText = plainText
  }

  get ciphertext(): string {
    const normalized = this.plainText.replace(/[^a-zA-Z0-9]/g, '').toLowerCase()
    
    if (normalized.length === 0) {
      return ''
    }
    
    const c = Math.ceil(Math.sqrt(normalized.length))
    const r = Math.ceil(normalized.length / c)
    
    const padded = normalized.padEnd(r * c, ' ')
    
    const result: string[] = []
    for (let col = 0; col < c; col++) {
      let column = ''
      for (let row = 0; row < r; row++) {
        const char = padded[row * c + col]
        column += char
      }
      result.push(column)
    }
    
    return result.join(' ')
  }
}
