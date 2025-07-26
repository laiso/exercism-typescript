export class Matrix {
  private _rows: number[][]

  constructor(matrixString: string) {
    this._rows = matrixString
      .split('\n')
      .map(row => row.split(' ').map(num => parseInt(num, 10)))
  }

  get rows(): number[][] {
    return this._rows
  }

  get columns(): number[][] {
    const numCols = this._rows[0].length
    const cols: number[][] = []
    
    for (let col = 0; col < numCols; col++) {
      cols.push(this._rows.map(row => row[col]))
    }
    
    return cols
  }
}