export class GradeSchool {
  private students: { [grade: number]: string[] } = {}

  roster(): { [grade: number]: string[] } {
    const result: { [grade: number]: string[] } = {}
    for (const grade of Object.keys(this.students).sort((a, b) => Number(a) - Number(b))) {
      result[Number(grade)] = [...this.students[Number(grade)]].sort()
    }
    return result
  }

  add(student: string, grade: number): void {
    if (!this.students[grade]) {
      this.students[grade] = []
    }
    this.students[grade].push(student)
  }

  grade(grade: number): string[] {
    return this.students[grade] ? [...this.students[grade]].sort() : []
  }
}
