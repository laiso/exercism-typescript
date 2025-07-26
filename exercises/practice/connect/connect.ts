export class Board {
  private board: string[]
  private rows: number
  private cols: number

  constructor(board: string[]) {
    this.board = board.map(row => row.trim().split(' ').join(''))
    this.rows = board.length
    this.cols = this.board[0] ? this.board[0].length : 0
  }

  public winner(): string {
    if (this.hasWinner('X')) return 'X'
    if (this.hasWinner('O')) return 'O'
    return ''
  }

  private hasWinner(player: string): boolean {
    const visited = new Set<string>()
    
    if (player === 'X') {
      for (let row = 0; row < this.rows; row++) {
        if (this.board[row][0] === player && !visited.has(`${row},0`)) {
          if (this.dfs(row, 0, player, visited, 'horizontal')) {
            return true
          }
        }
      }
    } else {
      for (let col = 0; col < this.cols; col++) {
        if (this.board[0][col] === player && !visited.has(`0,${col}`)) {
          if (this.dfs(0, col, player, visited, 'vertical')) {
            return true
          }
        }
      }
    }
    
    return false
  }

  private dfs(row: number, col: number, player: string, visited: Set<string>, direction: string): boolean {
    const key = `${row},${col}`
    if (visited.has(key)) return false
    if (row < 0 || row >= this.rows || col < 0 || col >= this.cols) return false
    if (this.board[row][col] !== player) return false
    
    visited.add(key)
    
    if (direction === 'horizontal' && col === this.cols - 1) return true
    if (direction === 'vertical' && row === this.rows - 1) return true
    
    const directions = [
      [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0]
    ]
    
    for (const [dr, dc] of directions) {
      if (this.dfs(row + dr, col + dc, player, visited, direction)) {
        return true
      }
    }
    
    return false
  }
}
