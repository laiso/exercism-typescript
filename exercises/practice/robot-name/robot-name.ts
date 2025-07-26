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
    this._name = this.generateName()
  }

  public static releaseNames(): void {
    Robot.usedNames.clear()
  }

  private generateName(): string {
    let newName: string
    do {
      const letters = String.fromCharCode(65 + Math.floor(Math.random() * 26)) + 
                     String.fromCharCode(65 + Math.floor(Math.random() * 26))
      const numbers = Math.floor(Math.random() * 1000).toString().padStart(3, '0')
      newName = letters + numbers
    } while (Robot.usedNames.has(newName))
    
    Robot.usedNames.add(newName)
    return newName
  }
}
