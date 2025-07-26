export class Squares {
  private count: number

  constructor(count: number) {
    this.count = count
  }

  get sumOfSquares(): number {
    // Formula: n(n+1)(2n+1)/6
    return (this.count * (this.count + 1) * (2 * this.count + 1)) / 6
  }

  get squareOfSum(): number {
    // Formula: (n(n+1)/2)²
    const sum = (this.count * (this.count + 1)) / 2
    return sum * sum
  }

  get difference(): number {
    return this.squareOfSum - this.sumOfSquares
  }
}
