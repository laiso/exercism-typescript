export function count(grid: string[]): number {
  if (grid.length === 0) return 0
  
  const rows = grid.length
  const cols = grid[0].length
  let rectangleCount = 0
  
  for (let r1 = 0; r1 < rows; r1++) {
    for (let c1 = 0; c1 < cols; c1++) {
      if (grid[r1][c1] === '+') {
        for (let r2 = r1 + 1; r2 < rows; r2++) {
          for (let c2 = c1 + 1; c2 < cols; c2++) {
            if (grid[r1][c2] === '+' && grid[r2][c1] === '+' && grid[r2][c2] === '+') {
              if (isValidRectangle(grid, r1, c1, r2, c2)) {
                rectangleCount++
              }
            }
          }
        }
      }
    }
  }
  
  return rectangleCount
}

function isValidRectangle(grid: string[], r1: number, c1: number, r2: number, c2: number): boolean {
  for (let c = c1 + 1; c < c2; c++) {
    if (grid[r1][c] !== '-' && grid[r1][c] !== '+') return false
    if (grid[r2][c] !== '-' && grid[r2][c] !== '+') return false
  }
  
  for (let r = r1 + 1; r < r2; r++) {
    if (grid[r][c1] !== '|' && grid[r][c1] !== '+') return false
    if (grid[r][c2] !== '|' && grid[r][c2] !== '+') return false
  }
  
  return true
}
