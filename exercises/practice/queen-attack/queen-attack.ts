type Position = readonly [number, number]

type Positions = {
  white: Position
  black: Position
}

export class QueenAttack {
  public readonly black: Position
  public readonly white: Position

  constructor({
    black = [0, 3],
    white = [7, 3],
  }: Partial<Positions> = {}) {
    if (this.isInvalid(white) || this.isInvalid(black)) {
      throw new Error('Queen must be placed on the board')
    }
    if (white[0] === black[0] && white[1] === black[1]) {
      throw new Error('Queens cannot share the same space')
    }
    this.white = white
    this.black = black
  }

  private isInvalid(position: Position): boolean {
    const [row, col] = position
    return row < 0 || row > 7 || col < 0 || col > 7
  }

  toString(): string {
    const board = Array.from({ length: 8 }, () => Array(8).fill('_'))
    board[this.white[0]][this.white[1]] = 'W'
    board[this.black[0]][this.black[1]] = 'B'
    return board.map((row) => row.join(' ')).join('\n')
  }

  get canAttack(): boolean {
    const [whiteRow, whiteCol] = this.white
    const [blackRow, blackCol] = this.black

    if (whiteRow === blackRow || whiteCol === blackCol) {
      return true
    }

    return Math.abs(whiteRow - blackRow) === Math.abs(whiteCol - blackCol)
  }
}
