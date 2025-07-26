export class Anagram {
  private word: string

  constructor(input: string) {
    this.word = input.toLowerCase()
  }

  public matches(...potentials: string[]): string[] {
    const sortedWord = this.word.split('').sort().join('')
    
    return potentials.filter(potential => {
      const lowerPotential = potential.toLowerCase()
      
      // Words are not anagrams of themselves
      if (lowerPotential === this.word) {
        return false
      }
      
      // Must have same length
      if (lowerPotential.length !== this.word.length) {
        return false
      }
      
      // Check if sorted letters match
      const sortedPotential = lowerPotential.split('').sort().join('')
      return sortedPotential === sortedWord
    })
  }
}
