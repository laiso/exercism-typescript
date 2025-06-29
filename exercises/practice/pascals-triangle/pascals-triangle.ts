export class Triangle {
  readonly rows: number[][]

  constructor(rowCount: number) {
    this.rows = []
    if (rowCount <= 0) {
      return
    }

    this.rows.push([1])

    for (let i = 1; i < rowCount; i++) {
      const previousRow = this.rows[i - 1]
      const newRow: number[] = [1]

      for (let j = 1; j < i; j++) {
        newRow.push(previousRow[j - 1] + previousRow[j])
      }

      newRow.push(1)
      this.rows.push(newRow)
    }
  }

  get lastRow(): number[] {
    return this.rows[this.rows.length - 1]
  }
}

