type Coordinates = { start: [number, number]; end: [number, number] }

export class WordSearch {
  private grid: string[]

  constructor(grid: string[]) {
    this.grid = grid
  }

  public find(
    words: string[]
  ): Record<string, Coordinates | undefined> {
    const results: Record<string, Coordinates | undefined> = {}

    for (const word of words) {
      results[word] = this.findWord(word)
    }

    return results
  }

  private findWord(word: string): Coordinates | undefined {
    for (let r = 0; r < this.grid.length; r++) {
      for (let c = 0; c < this.grid[r].length; c++) {
        if (this.grid[r][c] === word[0]) {
          const result = this.checkDirections(r, c, word)
          if (result) {
            return result
          }
        }
      }
    }
    return undefined
  }

  private checkDirections(
    r: number,
    c: number,
    word: string
  ): Coordinates | undefined {
    const directions = [
      { r: 0, c: 1 }, { r: 0, c: -1 }, { r: 1, c: 0 }, { r: -1, c: 0 },
      { r: 1, c: 1 }, { r: 1, c: -1 }, { r: -1, c: 1 }, { r: -1, c: -1 },
    ]

    for (const dir of directions) {
      let endR = r + (word.length - 1) * dir.r
      let endC = c + (word.length - 1) * dir.c
      let found = true

      for (let i = 0; i < word.length; i++) {
        const currR = r + i * dir.r
        const currC = c + i * dir.c

        if (
          currR < 0 || currR >= this.grid.length ||
          currC < 0 || currC >= this.grid[currR].length ||
          this.grid[currR][currC] !== word[i]
        ) {
          found = false
          break
        }
      }

      if (found) {
        return { start: [r + 1, c + 1], end: [endR + 1, endC + 1] }
      }
    }
    return undefined
  }
}
