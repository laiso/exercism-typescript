export class Allergies {
  private static allergens = [
    'eggs', 'peanuts', 'shellfish', 'strawberries',
    'tomatoes', 'chocolate', 'pollen', 'cats'
  ]
  
  private score: number

  constructor(score: number) {
    this.score = score
  }

  public list(): string[] {
    return Allergies.allergens.filter((_, index) => 
      (this.score & (1 << index)) !== 0
    )
  }

  public allergicTo(allergen: string): boolean {
    const index = Allergies.allergens.indexOf(allergen)
    return index !== -1 && (this.score & (1 << index)) !== 0
  }
}