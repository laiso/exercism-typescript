export class Crypto {
  private normalizedText: string

  constructor(plainText: string) {
    // Normalize: remove spaces and punctuation, convert to lowercase
    this.normalizedText = plainText
      .toLowerCase()
      .replace(/[^a-z0-9]/g, '')
  }

  get ciphertext(): string {
    if (this.normalizedText.length === 0) {
      return ''
    }

    // Calculate rectangle dimensions
    const length = this.normalizedText.length
    let c = Math.ceil(Math.sqrt(length))
    let r = Math.ceil(length / c)

    // Adjust to meet the constraints: c >= r and c - r <= 1
    while (c < r || c - r > 1) {
      c++
      r = Math.ceil(length / c)
    }

    // Create the rectangle by padding with spaces
    const paddedText = this.normalizedText.padEnd(r * c, ' ')
    
    // Split into rows
    const rows: string[] = []
    for (let i = 0; i < r; i++) {
      rows.push(paddedText.slice(i * c, (i + 1) * c))
    }

    // Read down the columns to create chunks
    const chunks: string[] = []
    for (let col = 0; col < c; col++) {
      let chunk = ''
      for (let row = 0; row < r; row++) {
        chunk += rows[row][col]
      }
      chunks.push(chunk)
    }

    return chunks.join(' ')
  }
}
