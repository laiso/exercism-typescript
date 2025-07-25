export function ofSize(size: number): number[][] {
  if (size === 0) return []
  
  const matrix: number[][] = Array(size).fill(null).map(() => Array(size).fill(0))
  
  let num = 1
  let top = 0, bottom = size - 1, left = 0, right = size - 1
  
  while (top <= bottom && left <= right) {
    // Fill top row
    for (let col = left; col <= right; col++) {
      matrix[top][col] = num++
    }
    top++
    
    // Fill right column
    for (let row = top; row <= bottom; row++) {
      matrix[row][right] = num++
    }
    right--
    
    // Fill bottom row (if exists)
    if (top <= bottom) {
      for (let col = right; col >= left; col--) {
        matrix[bottom][col] = num++
      }
      bottom--
    }
    
    // Fill left column (if exists)
    if (left <= right) {
      for (let row = bottom; row >= top; row--) {
        matrix[row][left] = num++
      }
      left++
    }
  }
  
  return matrix
}
