export class Anagram {
  private readonly subject: string

  constructor(input: string) {
    this.subject = input
  }

  private normalize(word: string): string {
    return [...word.toLowerCase()].sort().join('')
  }

  public matches(...potentials: string[]): string[] {
    const normalizedSubject = this.normalize(this.subject)
    const subjectLower = this.subject.toLowerCase()
    return potentials.filter((candidate) => {
      const candidateLower = candidate.toLowerCase()
      if (candidateLower === subjectLower) {
        return false
      }
      return this.normalize(candidate) === normalizedSubject
    })
  }
}
