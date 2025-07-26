export function count(grid: string[]): number {
  if (!grid || grid.length === 0) return 0
  
  const rows = grid.length
  const cols = grid[0].length
  let rectangleCount = 0
  
  for (let r1 = 0; r1 < rows; r1++) {
    for (let c1 = 0; c1 < cols; c1++) {
      if (grid[r1][c1] === '+') {
        for (let r2 = r1 + 1; r2 < rows; r2++) {
          for (let c2 = c1 + 1; c2 < cols; c2++) {
            if (grid[r2][c2] === '+') {
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
  for (let c = c1; c <= c2; c++) {
    const topChar = grid[r1][c]
    const bottomChar = grid[r2][c]
    
    if ((c === c1 || c === c2) && (topChar !== '+' || bottomChar !== '+')) {
      return false
    }
    
    if ((c !== c1 && c !== c2) && (topChar !== '-' && topChar !== '+')) {
      return false
    }
    if ((c !== c1 && c !== c2) && (bottomChar !== '-' && bottomChar !== '+')) {
      return false
    }
  }
  
  for (let r = r1; r <= r2; r++) {
    const leftChar = grid[r][c1]
    const rightChar = grid[r][c2]
    
    if ((r === r1 || r === r2) && (leftChar !== '+' || rightChar !== '+')) {
      return false
    }
    
    if ((r !== r1 && r !== r2) && (leftChar !== '|' && leftChar !== '+')) {
      return false
    }
    if ((r !== r1 && r !== r2) && (rightChar !== '|' && rightChar !== '+')) {
      return false
    }
  }
  
  return true
}
