export class Triangle {
  private sides: number[]

  constructor(...sides: number[]) {
    this.sides = sides.sort((a, b) => a - b)
    
    if (sides.length !== 3 || sides.some(side => side <= 0)) {
      throw new Error('Invalid triangle')
    }
    
    if (this.sides[0] + this.sides[1] <= this.sides[2]) {
      throw new Error('Invalid triangle')
    }
  }

  get isEquilateral(): boolean {
    return this.sides[0] === this.sides[1] && this.sides[1] === this.sides[2]
  }

  get isIsosceles(): boolean {
    return this.sides[0] === this.sides[1] || 
           this.sides[1] === this.sides[2] || 
           this.sides[0] === this.sides[2]
  }

  get isScalene(): boolean {
    return this.sides[0] !== this.sides[1] && 
           this.sides[1] !== this.sides[2] && 
           this.sides[0] !== this.sides[2]
  }
}
