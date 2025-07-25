export class Robot {
  private static usedNames = new Set<string>()
  private robotName: string

  constructor() {
    this.robotName = Robot.generateUniqueName()
  }

  public get name(): string {
    return this.robotName
  }

  public resetName(): void {
    this.robotName = Robot.generateUniqueName()
  }

  public static releaseNames(): void {
    Robot.usedNames.clear()
  }

  private static generateUniqueName(): string {
    const totalPossibleNames = 26 * 26 * 10 * 10 * 10
    
    if (Robot.usedNames.size >= totalPossibleNames) {
      throw new Error('All possible names have been used')
    }

    let name: string
    do {
      name = Robot.generateRandomName()
    } while (Robot.usedNames.has(name))

    Robot.usedNames.add(name)
    return name
  }

  private static generateRandomName(): string {
    // Generate 2 random uppercase letters
    const letter1 = String.fromCharCode(65 + Math.floor(Math.random() * 26)) // A-Z
    const letter2 = String.fromCharCode(65 + Math.floor(Math.random() * 26)) // A-Z
    
    // Generate 3 random digits
    const digit1 = Math.floor(Math.random() * 10).toString()
    const digit2 = Math.floor(Math.random() * 10).toString()
    const digit3 = Math.floor(Math.random() * 10).toString()
    
    return letter1 + letter2 + digit1 + digit2 + digit3
  }
}
