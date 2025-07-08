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
  constructor({ white = [0, 3], black = [7, 3] }: Partial<Positions> = {}) {
    if (white[0] === black[0] && white[1] === black[1]) {
      throw new Error('Queens cannot be placed on the same square')
    }
    this.white = white
    this.black = black
  }

  toString(): string {
    const board: string[][] = Array(8).fill(null).map(() => Array(8).fill('_'))
    board[this.white[0]][this.white[1]] = 'W'
    board[this.black[0]][this.black[1]] = 'B'
    return board.map(row => row.join(' ')).join('\n')
  }

  get canAttack(): boolean {
    const [wr, wc] = this.white
    const [br, bc] = this.black
    
    return wr === br || wc === bc || Math.abs(wr - br) === Math.abs(wc - bc)
  }
}
