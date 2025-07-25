export class Triangle {
  private sides: number[]

  constructor(a: number, b: number, c: number) {
    this.sides = [a, b, c].sort((x, y) => x - y)
  }

  private isValidTriangle(): boolean {
    const [a, b, c] = this.sides
    return a > 0 && b > 0 && c > 0 && a + b > c
  }

  get isEquilateral(): boolean {
    if (!this.isValidTriangle()) return false
    const [a, b, c] = this.sides
    return a === b && b === c
  }

  get isIsosceles(): boolean {
    if (!this.isValidTriangle()) return false
    const [a, b, c] = this.sides
    return a === b || b === c || a === c
  }

  get isScalene(): boolean {
    if (!this.isValidTriangle()) return false
    const [a, b, c] = this.sides
    return a !== b && b !== c && a !== c
  }
}
