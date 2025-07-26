export class Squares {
  private n: number

  constructor(n: number) {
    this.n = n
  }

  get squareOfSum(): number {
    const sum = (this.n * (this.n + 1)) / 2
    return sum * sum
  }

  get sumOfSquares(): number {
    return (this.n * (this.n + 1) * (2 * this.n + 1)) / 6
  }

  get difference(): number {
    return this.squareOfSum - this.sumOfSquares
  }
}