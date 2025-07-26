export class WordSearch {
  private grid: string[][]

  constructor(grid: string[]) {
    this.grid = grid.map(row => row.split(''))
  }

  public find(words: string[]): { [word: string]: { start: [number, number], end: [number, number] } | undefined } {
    const result: { [word: string]: { start: [number, number], end: [number, number] } | undefined } = {}
    
    for (const word of words) {
      result[word] = this.findWord(word)
    }
    
    return result
  }

  private findWord(word: string): { start: [number, number], end: [number, number] } | undefined {
    const directions = [
      [0, 1],   // right
      [0, -1],  // left
      [1, 0],   // down
      [-1, 0],  // up
      [1, 1],   // down-right
      [1, -1],  // down-left
      [-1, 1],  // up-right
      [-1, -1]  // up-left
    ]

    for (let row = 0; row < this.grid.length; row++) {
      for (let col = 0; col < this.grid[row].length; col++) {
        for (const [dr, dc] of directions) {
          if (this.searchInDirection(word, row, col, dr, dc)) {
            const endRow = row + (word.length - 1) * dr
            const endCol = col + (word.length - 1) * dc
            return {
              start: [row, col],
              end: [endRow, endCol]
            }
          }
        }
      }
    }
    
    return undefined
  }

  private searchInDirection(word: string, startRow: number, startCol: number, dr: number, dc: number): boolean {
    for (let i = 0; i < word.length; i++) {
      const row = startRow + i * dr
      const col = startCol + i * dc
      
      if (row < 0 || row >= this.grid.length || col < 0 || col >= this.grid[0].length) {
        return false
      }
      
      if (this.grid[row][col] !== word[i]) {
        return false
      }
    }
    
    return true
  }
}
