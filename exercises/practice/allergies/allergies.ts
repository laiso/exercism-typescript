export class Allergies {
  private score: number
  private static readonly ALLERGENS = [
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
    this.score = allergenIndex
  }

  public list(): string[] {
    const allergies: string[] = []
    for (let i = 0; i < Allergies.ALLERGENS.length; i++) {
      if (this.score & (1 << i)) {
        allergies.push(Allergies.ALLERGENS[i])
      }
    }
    return allergies
  }

  public allergicTo(allergen: string): boolean {
    const index = Allergies.ALLERGENS.indexOf(allergen)
    if (index === -1) return false
    return (this.score & (1 << index)) !== 0
  }
}
