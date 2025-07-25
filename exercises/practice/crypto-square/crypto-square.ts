export class Crypto {
  private normalizedText: string

  constructor(plainText: string) {
    // Normalize: lowercase, remove non-alphanumeric characters
    this.normalizedText = plainText.toLowerCase().replace(/[^a-z0-9]/g, '')
  }

  get ciphertext(): string {
    if (this.normalizedText === '') return ''
    
    const length = this.normalizedText.length
    const cols = Math.ceil(Math.sqrt(length))
    const rows = Math.ceil(length / cols)
    
    // Create the square matrix
    const matrix: string[][] = []
    for (let i = 0; i < rows; i++) {
      matrix[i] = []
      for (let j = 0; j < cols; j++) {
        const index = i * cols + j
        matrix[i][j] = index < length ? this.normalizedText[index] : ' '
      }
    }
    
    // Read column by column to create cipher
    const result: string[] = []
    for (let col = 0; col < cols; col++) {
      let column = ''
      for (let row = 0; row < rows; row++) {
        column += matrix[row][col]
      }
      result.push(column)
    }
    
    return result.join(' ')
  }
}
