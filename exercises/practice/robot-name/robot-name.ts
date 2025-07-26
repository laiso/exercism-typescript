export class Robot {
  private static usedNames = new Set<string>()
  private _name: string

  constructor() {
    this._name = this.generateName()
  }

  public get name(): string {
    return this._name
  }

  public resetName(): void {
    Robot.usedNames.delete(this._name)
    this._name = this.generateName()
  }

  public static releaseNames(): void {
    Robot.usedNames.clear()
  }

  private generateName(): string {
    let newName: string
    do {
      newName = this.randomName()
    } while (Robot.usedNames.has(newName))
    Robot.usedNames.add(newName)
    return newName
  }

  private randomName(): string {
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    const numbers = '0123456789'
    let name = ''
    for (let i = 0; i < 2; i++) {
      name += letters.charAt(Math.floor(Math.random() * letters.length))
    }
    for (let i = 0; i < 3; i++) {
      name += numbers.charAt(Math.floor(Math.random() * numbers.length))
    }
    return name
  }
}
