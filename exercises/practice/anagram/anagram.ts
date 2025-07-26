export class Anagram {
  private target: string
  private targetSorted: string

  constructor(input: string) {
    this.target = input
    this.targetSorted = this.sortLetters(input.toLowerCase())
  }

  public matches(...potentials: string[]): string[] {
    const matches: string[] = []
    
    for (const potential of potentials) {
      // Skip if it's the same word (case-insensitive)
      if (potential.toLowerCase() === this.target.toLowerCase()) {
        continue
      }
      
      // Check if it's an anagram
      if (this.sortLetters(potential.toLowerCase()) === this.targetSorted) {
        matches.push(potential)
      }
    }
    
    return matches
  }

  private sortLetters(word: string): string {
    return word.split('').sort().join('')
  }
}
