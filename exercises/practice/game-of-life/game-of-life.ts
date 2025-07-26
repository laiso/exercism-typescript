export class GameOfLife {
  private matrix: number[][]

  constructor(matrix: number[][]) {
    this.matrix = matrix.map(row => [...row])
  }

  public tick(): void {
    const rows = this.matrix.length
    const cols = this.matrix[0]?.length || 0
    const newMatrix: number[][] = Array(rows).fill(null).map(() => Array(cols).fill(0))

    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        const neighbors = this.countNeighbors(i, j)
        const isAlive = this.matrix[i][j] === 1

        if (isAlive && (neighbors === 2 || neighbors === 3)) {
          newMatrix[i][j] = 1
        } else if (!isAlive && neighbors === 3) {
          newMatrix[i][j] = 1
        } else {
          newMatrix[i][j] = 0
        }
      }
    }

    this.matrix = newMatrix
  }

  public state(): number[][] {
    return this.matrix.map(row => [...row])
  }

  private countNeighbors(row: number, col: number): number {
    let count = 0
    const rows = this.matrix.length
    const cols = this.matrix[0]?.length || 0

    for (let i = -1; i <= 1; i++) {
      for (let j = -1; j <= 1; j++) {
        if (i === 0 && j === 0) continue
        
        const newRow = row + i
        const newCol = col + j
        
        if (newRow >= 0 && newRow < rows && newCol >= 0 && newCol < cols) {
          count += this.matrix[newRow][newCol]
        }
      }
    }

    return count
  }
}
