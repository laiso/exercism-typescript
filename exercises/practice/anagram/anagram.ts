export class Anagram {
  private word: string

  constructor(input: string) {
    this.word = input.toLowerCase()
  }

  public matches(...potentials: string[]): string[] {
    const sortedWord = this.word.split('').sort().join('')
    return potentials.filter(potential => {
      const potentialLower = potential.toLowerCase()
      
      // Word cannot be anagram of itself
      if (potentialLower === this.word) {
        return false
      }
      
      // Must have same length
      if (potentialLower.length !== this.word.length) {
        return false
      }
      
      // Must have same sorted letters
      const sortedPotential = potentialLower.split('').sort().join('')
      return sortedPotential === sortedWord
    })
  }
}
