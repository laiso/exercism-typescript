export function ofSize(size: number): number[][] {
  if (size === 0) return []
  
  const matrix: number[][] = Array(size).fill(null).map(() => Array(size).fill(0))
  
  let top = 0, bottom = size - 1, left = 0, right = size - 1
  let num = 1
  
  while (top <= bottom && left <= right) {
    for (let i = left; i <= right; i++) {
      matrix[top][i] = num++
    }
    top++
    
    for (let i = top; i <= bottom; i++) {
      matrix[i][right] = num++
    }
    right--
    
    if (top <= bottom) {
      for (let i = right; i >= left; i--) {
        matrix[bottom][i] = num++
      }
      bottom--
    }
    
    if (left <= right) {
      for (let i = bottom; i >= top; i--) {
        matrix[i][left] = num++
      }
      left++
    }
  }
  
  return matrix
}
