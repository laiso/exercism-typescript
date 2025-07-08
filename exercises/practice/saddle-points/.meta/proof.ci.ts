export function saddlePoints(matrix: number[][]): { row: number; column: number }[] {
  if (matrix.length === 0) return []
  
  const result: { row: number; column: number }[] = []
  
  for (let row = 0; row < matrix.length; row++) {
    for (let col = 0; col < matrix[row].length; col++) {
      const value = matrix[row][col]
      
      const isRowMax = matrix[row].every(val => val <= value)
      const isColMin = matrix.every(r => r[col] >= value)
      
      if (isRowMax && isColMin) {
        result.push({ row: row + 1, column: col + 1 })
      }
    }
  }
  
  return result
}
