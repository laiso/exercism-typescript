export class DnDCharacter {
  public static generateAbilityScore(): number {
    // Roll 4d6, drop the lowest die
    const rolls = []
    for (let i = 0; i < 4; i++) {
      rolls.push(Math.floor(Math.random() * 6) + 1)
    }
    
    rolls.sort((a, b) => b - a) // Sort descending
    return rolls[0] + rolls[1] + rolls[2] // Sum highest 3
  }

  public static getModifierFor(abilityValue: number): number {
    return Math.floor((abilityValue - 10) / 2)
  }
}
