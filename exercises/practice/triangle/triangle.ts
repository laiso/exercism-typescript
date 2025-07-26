export class Triangle {
  private sides: number[]

  constructor(...sides: number[]) {
    this.sides = sides
  }

  get isEquilateral(): boolean {
    return this.isValid() && this.sides[0] === this.sides[1] && this.sides[1] === this.sides[2]
  }

  get isIsosceles(): boolean {
    return (
      this.isValid() &&
      (this.sides[0] === this.sides[1] ||
        this.sides[1] === this.sides[2] ||
        this.sides[0] === this.sides[2])
    )
  }

  get isScalene(): boolean {
    return this.isValid() && !this.isIsosceles
  }

  private isValid(): boolean {
    const [a, b, c] = this.sides
    return (
      a > 0 &&
      b > 0 &&
      c > 0 &&
      a + b >= c &&
      b + c >= a &&
      a + c >= b
    )
  }
}
