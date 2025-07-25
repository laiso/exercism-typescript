export class Squares {
  private count: number

  constructor(count: number) {
    this.count = count
  }

  get sumOfSquares(): number {
    let sum = 0
    for (let i = 1; i <= this.count; i++) {
      sum += i * i
    }
    return sum
  }

  get squareOfSum(): number {
    let sum = 0
    for (let i = 1; i <= this.count; i++) {
      sum += i
    }
    return sum * sum
  }

  get difference(): number {
    return this.squareOfSum - this.sumOfSquares
  }
}
