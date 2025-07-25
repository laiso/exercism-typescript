type Position = readonly [number, number]

type Positions = {
  white: Position
  black: Position
}

export class QueenAttack {
  public readonly black: Position
  public readonly white: Position

  constructor({ white = [7, 3], black = [0, 3] }: Partial<Positions> = {}) {
    // Validate positions
    this.validatePosition(white, 'white')
    this.validatePosition(black, 'black')
    
    // Check if queens are on the same position
    if (white[0] === black[0] && white[1] === black[1]) {
      throw new Error('Queens cannot be placed on the same position')
    }
    
    this.white = white
    this.black = black
  }

  private validatePosition(position: Position, color: string): void {
    const [row, col] = position
    if (row < 0 || row > 7 || col < 0 || col > 7) {
      throw new Error('Queen must be placed on the board')
    }
  }

  toString(): string {
    const board: string[][] = []
    
    // Initialize empty board
    for (let row = 0; row < 8; row++) {
      board[row] = []
      for (let col = 0; col < 8; col++) {
        board[row][col] = '_'
      }
    }
    
    // Place queens
    board[this.white[0]][this.white[1]] = 'W'
    board[this.black[0]][this.black[1]] = 'B'
    
    // Convert to string
    return board.map(row => row.join(' ')).join('\n')
  }

  get canAttack(): boolean {
    const [whiteRow, whiteCol] = this.white
    const [blackRow, blackCol] = this.black
    
    // Same row
    if (whiteRow === blackRow) return true
    
    // Same column
    if (whiteCol === blackCol) return true
    
    // Same diagonal (difference in rows equals difference in columns)
    if (Math.abs(whiteRow - blackRow) === Math.abs(whiteCol - blackCol)) return true
    
    return false
  }
}
