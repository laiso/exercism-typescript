export class Allergies {
  private score: number
  private allergens = [
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
    // Only consider the lower 8 bits to ignore higher allergens
    this.score = allergenIndex & 255
  }

  public list(): string[] {
    const result: string[] = []
    
    for (let i = 0; i < this.allergens.length; i++) {
      if (this.score & (1 << i)) {
        result.push(this.allergens[i])
      }
    }
    
    return result
  }

  public allergicTo(allergen: string): boolean {
    const index = this.allergens.indexOf(allergen)
    if (index === -1) return false
    
    return (this.score & (1 << index)) !== 0
  }
}
