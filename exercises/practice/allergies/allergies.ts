export class Allergies {
  private static readonly allergens = [
    'eggs',
    'peanuts',
    'shellfish',
    'strawberries',
    'tomatoes',
    'chocolate',
    'pollen',
    'cats'
  ]
  
  private score: number

  constructor(allergenIndex: number) {
    // Ignore scores above 255 (2^8 - 1) as they represent invalid allergens
    this.score = allergenIndex % 256
  }

  public list(): string[] {
    const result: string[] = []
    
    for (let i = 0; i < Allergies.allergens.length; i++) {
      const allergenValue = 1 << i // 2^i
      if (this.score & allergenValue) {
        result.push(Allergies.allergens[i])
      }
    }
    
    return result
  }

  public allergicTo(allergen: string): boolean {
    const allergenIndex = Allergies.allergens.indexOf(allergen)
    if (allergenIndex === -1) {
      return false
    }
    
    const allergenValue = 1 << allergenIndex // 2^allergenIndex
    return (this.score & allergenValue) !== 0
  }
}
