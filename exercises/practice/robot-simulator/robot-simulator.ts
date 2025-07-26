export class InvalidInputError extends Error {
  constructor(message: string) {
    super()
    this.message = message || 'Invalid Input'
  }
}

type Direction = 'north' | 'east' | 'south' | 'west'
type Coordinates = [number, number]

export class Robot {
  private _bearing: Direction = 'north'
  private _coordinates: Coordinates = [0, 0]

  get bearing(): Direction {
    return this._bearing
  }

  get coordinates(): Coordinates {
    return this._coordinates
  }

  place({ x, y, direction }: { x: number; y: number; direction: string }) {
    const validDirections = ['north', 'east', 'south', 'west']
    if (!validDirections.includes(direction)) {
      throw new InvalidInputError('Invalid direction')
    }
    this._coordinates = [x, y]
    this._bearing = direction as Direction
  }

  evaluate(instructions: string) {
    for (const instruction of instructions) {
      switch (instruction) {
        case 'R':
          this.turnRight()
          break
        case 'L':
          this.turnLeft()
          break
        case 'A':
          this.advance()
          break
        default:
          throw new InvalidInputError('Invalid instruction')
      }
    }
  }

  private turnRight() {
    const directions: Direction[] = ['north', 'east', 'south', 'west']
    const currentIndex = directions.indexOf(this._bearing)
    this._bearing = directions[(currentIndex + 1) % 4]
  }

  private turnLeft() {
    const directions: Direction[] = ['north', 'east', 'south', 'west']
    const currentIndex = directions.indexOf(this._bearing)
    this._bearing = directions[(currentIndex + 3) % 4]
  }

  private advance() {
    const [x, y] = this._coordinates
    switch (this._bearing) {
      case 'north':
        this._coordinates = [x, y + 1]
        break
      case 'east':
        this._coordinates = [x + 1, y]
        break
      case 'south':
        this._coordinates = [x, y - 1]
        break
      case 'west':
        this._coordinates = [x - 1, y]
        break
    }
  }
}
