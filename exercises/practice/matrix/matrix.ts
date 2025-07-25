export class Matrix {
  private matrixRows: number[][]

  constructor(matrixString: string) {
    this.matrixRows = matrixString
      .split('\n')
      .map(row => row.split(' ').map(num => parseInt(num, 10)))
  }

  get rows(): number[][] {
    return this.matrixRows
  }

  get columns(): number[][] {
    const numCols = this.matrixRows[0].length
    const cols: number[][] = []
    
    for (let colIndex = 0; colIndex < numCols; colIndex++) {
      const column: number[] = []
      for (let rowIndex = 0; rowIndex < this.matrixRows.length; rowIndex++) {
        column.push(this.matrixRows[rowIndex][colIndex])
      }
      cols.push(column)
    }
    
    return cols
  }
}
