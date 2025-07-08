export class Board {
  private board: string[]

  constructor(board: string[]) {
    this.board = board
  }

  public winner(): string {
    const rows = this.board.length
    const cols = this.board[0].length
    
    const isValidPosition = (row: number, col: number): boolean => {
      return row >= 0 && row < rows && col >= 0 && col < cols
    }
    
    const getNeighbors = (row: number, col: number): [number, number][] => {
      const directions = [[-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0]]
      return directions
        .map(([dr, dc]) => [row + dr, col + dc] as [number, number])
        .filter(([r, c]) => isValidPosition(r, c))
    }
    
    const dfs = (row: number, col: number, player: string, visited: Set<string>): boolean => {
      const key = `${row},${col}`
      if (visited.has(key)) return false
      if (this.board[row][col] !== player) return false
      
      visited.add(key)
      
      if (player === 'X' && col === cols - 1) return true
      if (player === 'O' && row === rows - 1) return true
      
      for (const [nr, nc] of getNeighbors(row, col)) {
        if (dfs(nr, nc, player, visited)) return true
      }
      
      return false
    }
    
    for (let row = 0; row < rows; row++) {
      if (this.board[row][0] === 'X' && dfs(row, 0, 'X', new Set())) {
        return 'X'
      }
    }
    
    for (let col = 0; col < cols; col++) {
      if (this.board[0][col] === 'O' && dfs(0, col, 'O', new Set())) {
        return 'O'
      }
    }
    
    return ''
  }
}
