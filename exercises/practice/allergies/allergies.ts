export class Allergies {
  private allergenIndex: number
  private allergenMap = {
    'eggs': 1,
    'peanuts': 2,
    'shellfish': 4,
    'strawberries': 8,
    'tomatoes': 16,
    'chocolate': 32,
    'pollen': 64,
    'cats': 128
  }

  constructor(allergenIndex: number) {
    this.allergenIndex = allergenIndex
  }

  public list(): string[] {
    const allergies: string[] = []
    const maxValidScore = 255 // Only consider the first 8 bits
    
    // Use only the valid part of the score
    const validScore = this.allergenIndex & maxValidScore
    
    for (const [allergen, score] of Object.entries(this.allergenMap)) {
      if ((validScore & score) !== 0) {
        allergies.push(allergen)
      }
    }
    
    return allergies
  }

  public allergicTo(allergen: string): boolean {
    const allergenScore = this.allergenMap[allergen as keyof typeof this.allergenMap]
    if (allergenScore === undefined) {
      return false
    }
    
    const maxValidScore = 255
    const validScore = this.allergenIndex & maxValidScore
    
    return (validScore & allergenScore) !== 0
  }
}
