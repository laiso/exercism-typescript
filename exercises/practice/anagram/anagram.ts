export class Anagram {
  private readonly sortedWord: string
  private readonly originalWord: string

  constructor(input: string) {
    this.originalWord = input.toLowerCase()
    this.sortedWord = this.originalWord.split('').sort().join('')
  }

  public matches(...potentials: string[]): string[] {
    return potentials.filter((potential) => {
      const lowerPotential = potential.toLowerCase()
      if (lowerPotential === this.originalWord) {
        return false
      }
      return lowerPotential.split('').sort().join('') === this.sortedWord
    })
  }
}
