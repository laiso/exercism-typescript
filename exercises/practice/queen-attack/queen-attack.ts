type Position = readonly [number, number]

type Positions = {
  white: Position
  black: Position
}
export class QueenAttack {
  public readonly black: Position
  public readonly white: Position

  // white: [whiteRow, whiteColumn]
  // black: [blackRow, blackColumn]
  constructor({ white = [7, 3], black = [0, 3] }: Partial<Positions> = {}) {
    if (white[0] < 0 || white[0] > 7 || white[1] < 0 || white[1] > 7) {
      throw new Error('Queen must be placed on the board')
    }
    if (black[0] < 0 || black[0] > 7 || black[1] < 0 || black[1] > 7) {
      throw new Error('Queen must be placed on the board')
    }
    
    if (white[0] === black[0] && white[1] === black[1]) {
      throw new Error('Queens cannot share the same space')
    }
    
    this.white = white
    this.black = black
  }

  toString() {
    let board = ''
    for (let row = 0; row < 8; row++) {
      for (let col = 0; col < 8; col++) {
        if (this.white[0] === row && this.white[1] === col) {
          board += 'W'
        } else if (this.black[0] === row && this.black[1] === col) {
          board += 'B'
        } else {
          board += '_'
        }
        if (col < 7) board += ' '
      }
      if (row < 7) board += '\n'
    }
    return board
  }

  get canAttack() {
    const [whiteRow, whiteCol] = this.white
    const [blackRow, blackCol] = this.black
    
    if (whiteRow === blackRow) return true
    
    if (whiteCol === blackCol) return true
    
    if (Math.abs(whiteRow - blackRow) === Math.abs(whiteCol - blackCol)) return true
    
    return false
  }
}
