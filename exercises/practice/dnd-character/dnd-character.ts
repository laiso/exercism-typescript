export class DnDCharacter {
  public strength: number
  public dexterity: number
  public constitution: number
  public intelligence: number
  public wisdom: number
  public charisma: number
  public hitpoints: number

  constructor() {
    this.strength = DnDCharacter.generateAbilityScore()
    this.dexterity = DnDCharacter.generateAbilityScore()
    this.constitution = DnDCharacter.generateAbilityScore()
    this.intelligence = DnDCharacter.generateAbilityScore()
    this.wisdom = DnDCharacter.generateAbilityScore()
    this.charisma = DnDCharacter.generateAbilityScore()
    
    this.hitpoints = 10 + DnDCharacter.getModifierFor(this.constitution)
  }

  public static generateAbilityScore(): number {
    // Roll 4d6, drop the lowest, sum the rest
    const rolls: number[] = []
    for (let i = 0; i < 4; i++) {
      rolls.push(Math.floor(Math.random() * 6) + 1)
    }
    
    // Sort in descending order and drop the lowest
    rolls.sort((a, b) => b - a)
    return rolls[0] + rolls[1] + rolls[2]
  }

  public static getModifierFor(abilityValue: number): number {
    // Formula: (abilityValue - 10) / 2, rounded down
    return Math.floor((abilityValue - 10) / 2)
  }
}
