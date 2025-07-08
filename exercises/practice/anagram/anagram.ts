export class Anagram {
  private target: string
  private targetSorted: string

  constructor(input: string) {
    this.target = input
    this.targetSorted = this.sortString(input.toLowerCase())
  }

  public matches(...potentials: string[]): string[] {
    const result: string[] = []
    
    for (const potential of potentials) {
      if (this.isAnagram(potential)) {
        result.push(potential)
      }
    }
    
    return result
  }

  private isAnagram(word: string): boolean {
    // A word is not its own anagram
    if (word.toLowerCase() === this.target.toLowerCase()) {
      return false
    }
    
    // Check if sorted letters match
    return this.sortString(word.toLowerCase()) === this.targetSorted
  }

  private sortString(str: string): string {
    return str.split('').sort().join('')
  }
}
