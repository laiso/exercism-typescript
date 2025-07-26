export class Triangle {
  private sides: number[]

  constructor(...sides: number[]) {
    this.sides = sides.sort((a, b) => a - b)
    
    if (sides.length !== 3) {
      throw new Error('Triangle must have exactly 3 sides')
    }
    
    if (sides.some(side => side <= 0)) {
      throw new Error('All sides must be positive')
    }
    
    if (this.sides[0] + this.sides[1] <= this.sides[2]) {
      throw new Error('Triangle inequality violation')
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
