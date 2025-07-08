export class Crypto {
  private plainText: string

  constructor(plainText: string) {
    this.plainText = plainText.toLowerCase().replace(/[^a-z0-9]/g, '')
  }

  get ciphertext(): string {
    if (this.plainText.length === 0) return ''
    
    const size = Math.ceil(Math.sqrt(this.plainText.length))
    const rows: string[] = []
    
    for (let i = 0; i < this.plainText.length; i += size) {
      rows.push(this.plainText.slice(i, i + size).padEnd(size, ' '))
    }
    
    const columns: string[] = []
    for (let col = 0; col < size; col++) {
      let column = ''
      for (let row = 0; row < rows.length; row++) {
        column += rows[row][col] || ' '
      }
      columns.push(column.trimEnd())
    }
    
    return columns.join(' ')
  }
}
