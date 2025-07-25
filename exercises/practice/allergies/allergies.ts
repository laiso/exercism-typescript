export class Allergies {
  private score: number
  private static allergens = [
    'eggs',
    'peanuts', 
    'shellfish',
    'strawberries',
    'tomatoes',
    'chocolate',
    'pollen',
    'cats'
  ]

  constructor(allergenIndex: number) {
    this.score = allergenIndex & 255 // Only consider bits 0-7
  }

  public list(): string[] {
    const result: string[] = []
    for (let i = 0; i < Allergies.allergens.length; i++) {
      if (this.score & (1 << i)) {
        result.push(Allergies.allergens[i])
      }
    }
    return result
  }

  public allergicTo(allergen: string): boolean {
    const index = Allergies.allergens.indexOf(allergen)
    if (index === -1) return false
    return (this.score & (1 << index)) !== 0
  }
}
