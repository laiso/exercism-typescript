export function saddlePoints(matrix: number[][]): Array<{ row: number; column: number }> {
  if (matrix.length === 0 || matrix[0].length === 0) {
    return []
  }

  const rows = matrix.length
  const cols = matrix[0].length
  const points: Array<{ row: number; column: number }> = []

  // For each position in the matrix
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const value = matrix[row][col]

      // Check if it's the maximum in its row
      const isMaxInRow = matrix[row].every(val => val <= value)

      // Check if it's the minimum in its column
      const isMinInCol = matrix.every(r => r[col] >= value)

      if (isMaxInRow && isMinInCol) {
        points.push({ row: row + 1, column: col + 1 }) // 1-indexed
      }
    }
  }

  return points
}
