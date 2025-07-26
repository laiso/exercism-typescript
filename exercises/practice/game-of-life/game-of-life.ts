export class GameOfLife {
  private matrix: number[][]

  constructor(matrix: number[][]) {
    this.matrix = matrix.map(row => [...row]) // Deep copy
  }

  public tick(): void {
    if (this.matrix.length === 0) {
      return
    }

    const rows = this.matrix.length
    const cols = this.matrix[0].length
    const newMatrix: number[][] = []

    for (let i = 0; i < rows; i++) {
      newMatrix[i] = []
      for (let j = 0; j < cols; j++) {
        const neighbors = this.countLiveNeighbors(i, j)
        const currentCell = this.matrix[i][j]

        if (currentCell === 1) {
          // Live cell: survives if it has 2 or 3 live neighbors
          newMatrix[i][j] = (neighbors === 2 || neighbors === 3) ? 1 : 0
        } else {
          // Dead cell: becomes alive if it has exactly 3 live neighbors
          newMatrix[i][j] = neighbors === 3 ? 1 : 0
        }
      }
    }

    this.matrix = newMatrix
  }

  public state(): number[][] {
    return this.matrix.map(row => [...row]) // Return a copy
  }

  private countLiveNeighbors(row: number, col: number): number {
    const rows = this.matrix.length
    const cols = this.matrix[0].length
    let count = 0

    // Check all 8 neighbors
    for (let i = -1; i <= 1; i++) {
      for (let j = -1; j <= 1; j++) {
        if (i === 0 && j === 0) continue // Skip the cell itself

        const newRow = row + i
        const newCol = col + j

        // Check bounds
        if (newRow >= 0 && newRow < rows && newCol >= 0 && newCol < cols) {
          count += this.matrix[newRow][newCol]
        }
      }
    }

    return count
  }
}
