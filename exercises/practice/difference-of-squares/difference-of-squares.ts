export class Squares {
  private count: number

  constructor(count: number) {
    this.count = count
  }

  get sumOfSquares(): number {
    // Formula: n(n+1)(2n+1)/6
    const n = this.count
    return (n * (n + 1) * (2 * n + 1)) / 6
  }

  get squareOfSum(): number {
    // Formula: (n(n+1)/2)^2
    const n = this.count
    const sum = (n * (n + 1)) / 2
    return sum * sum
  }

  get difference(): number {
    return this.squareOfSum - this.sumOfSquares
  }
}
