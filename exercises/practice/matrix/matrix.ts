export class Matrix {
  private matrix: number[][]

  constructor(matrixString: string) {
    this.matrix = matrixString
      .split('\n')
      .map((row) => row.split(' ').map(Number))
  }

  get rows(): number[][] {
    return this.matrix
  }

  get columns(): number[][] {
    const columns: number[][] = []
    for (let i = 0; i < this.matrix[0].length; i++) {
      columns.push(this.matrix.map((row) => row[i]))
    }
    return columns
  }
}
