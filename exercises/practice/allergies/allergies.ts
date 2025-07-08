export class Allergies {
  private allergenIndex: number
  private allergens = [
    { name: 'eggs', value: 1 },
    { name: 'peanuts', value: 2 },
    { name: 'shellfish', value: 4 },
    { name: 'strawberries', value: 8 },
    { name: 'tomatoes', value: 16 },
    { name: 'chocolate', value: 32 },
    { name: 'pollen', value: 64 },
    { name: 'cats', value: 128 }
  ]

  constructor(allergenIndex: number) {
    this.allergenIndex = allergenIndex
  }

  public list(): string[] {
    const result: string[] = []
    for (const allergen of this.allergens) {
      if (this.allergenIndex & allergen.value) {
        result.push(allergen.name)
      }
    }
    return result
  }

  public allergicTo(allergen: string): boolean {
    const found = this.allergens.find(a => a.name === allergen)
    if (!found) return false
    return (this.allergenIndex & found.value) !== 0
  }
}
