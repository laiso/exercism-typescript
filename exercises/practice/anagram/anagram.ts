export class Anagram {
  private target: string

  constructor(input: string) {
    this.target = input.toLowerCase()
  }

  private sortedLetters(word: string): string {
    return word.toLowerCase().split('').sort().join('')
  }

  public matches(...potentials: string[]): string[] {
    const targetSorted = this.sortedLetters(this.target)
    
    return potentials.filter(candidate => {
      const candidateLower = candidate.toLowerCase()
      return candidateLower !== this.target && // Not the same word
             this.sortedLetters(candidate) === targetSorted // Is anagram
    })
  }
}
