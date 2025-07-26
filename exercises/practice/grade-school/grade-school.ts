export class GradeSchool {
  private schoolRoster: Record<number, string[]> = {}

  roster(): Record<number, string[]> {
    return JSON.parse(JSON.stringify(this.schoolRoster))
  }

  add(name: string, grade: number): void {
    for (const g in this.schoolRoster) {
      this.schoolRoster[g] = this.schoolRoster[g].filter((n) => n !== name)
    }

    if (!this.schoolRoster[grade]) {
      this.schoolRoster[grade] = []
    }
    this.schoolRoster[grade].push(name)
    this.schoolRoster[grade].sort()
  }

  grade(grade: number): string[] {
    return [...(this.schoolRoster[grade] || [])]
  }
}
