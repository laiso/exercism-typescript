export class Anagram {
  private target: string

  constructor(input: string) {
    this.target = input
  }

  public matches(...potentials: string[]): string[] {
    const targetLower = this.target.toLowerCase()
    const targetSorted = this.sortLetters(targetLower)
    
    return potentials.filter(candidate => {
      const candidateLower = candidate.toLowerCase()
      
      // A word is not its own anagram
      if (candidateLower === targetLower) {
        return false
      }
      
      // Check if candidate is an anagram by comparing sorted letters
      const candidateSorted = this.sortLetters(candidateLower)
      return candidateSorted === targetSorted
    })
  }

  private sortLetters(word: string): string {
    return word.split('').sort().join('')
  }
}
