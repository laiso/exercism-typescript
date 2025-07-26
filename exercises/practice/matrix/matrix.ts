export class Matrix {
  private matrix: number[][]

  constructor(input: string) {
    this.matrix = input.split('\n').map(row => 
      row.split(' ').map(num => parseInt(num, 10))
    )
  }

  get rows(): number[][] {
    return this.matrix.map(row => [...row])
  }

  get columns(): number[][] {
    const numCols = this.matrix[0].length
    const columns: number[][] = []
    
    for (let col = 0; col < numCols; col++) {
      columns.push(this.matrix.map(row => row[col]))
    }
    
    return columns
  }
}
