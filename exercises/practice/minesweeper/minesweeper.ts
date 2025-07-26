export function annotate(field: string[]): string[] {
  if (field.length === 0) return []
  
  const rows = field.length
  const cols = field[0].length
  const result: string[] = []
  
  for (let row = 0; row < rows; row++) {
    let newRow = ''
    for (let col = 0; col < cols; col++) {
      if (field[row][col] === '*') {
        newRow += '*'
      } else {
        let count = 0
        for (let dr = -1; dr <= 1; dr++) {
          for (let dc = -1; dc <= 1; dc++) {
            if (dr === 0 && dc === 0) continue
            const newRow = row + dr
            const newCol = col + dc
            if (newRow >= 0 && newRow < rows && newCol >= 0 && newCol < cols) {
              if (field[newRow][newCol] === '*') {
                count++
              }
            }
          }
        }
        newRow += count === 0 ? ' ' : count.toString()
      }
    }
    result.push(newRow)
  }
  
  return result
}
