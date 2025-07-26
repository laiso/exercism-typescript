export class Triangle {
  private triangleRows: number[][]

  constructor(rowCount: number) {
    this.triangleRows = []
    
    for (let i = 0; i < rowCount; i++) {
      const row: number[] = []
      
      for (let j = 0; j <= i; j++) {
        if (j === 0 || j === i) {
          row.push(1)
        } else {
          const leftValue = this.triangleRows[i - 1][j - 1]
          const rightValue = this.triangleRows[i - 1][j]
          row.push(leftValue + rightValue)
        }
      }
      
      this.triangleRows.push(row)
    }
  }

  get rows(): number[][] {
    return this.triangleRows
  }

  get lastRow(): number[] {
    return this.triangleRows[this.triangleRows.length - 1]
  }
}
