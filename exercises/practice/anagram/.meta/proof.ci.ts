export class Anagram {
  private word: string

  constructor(input: string) {
    this.word = input.toLowerCase()
  }

  public matches(...potentials: string[]): string[] {
    const sortedWord = this.word.split('').sort().join('')
    
    return potentials.filter(potential => {
      const lowerPotential = potential.toLowerCase()
      if (lowerPotential === this.word) return false
      
      const sortedPotential = lowerPotential.split('').sort().join('')
      return sortedPotential === sortedWord
    })
  }
}
