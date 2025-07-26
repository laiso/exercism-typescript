export class GradeSchool {
  private students: { [grade: number]: string[] } = {}

  roster(): { [grade: number]: string[] } {
    const result: { [grade: number]: string[] } = {}
    const grades = Object.keys(this.students).map(Number).sort((a, b) => a - b)
    
    for (const grade of grades) {
      result[grade] = [...this.students[grade]].sort()
    }
    
    return result
  }

  add(student: string, grade: number): void {
    for (const existingGrade in this.students) {
      const index = this.students[existingGrade].indexOf(student)
      if (index !== -1) {
        this.students[existingGrade].splice(index, 1)
      }
    }
    
    if (!this.students[grade]) {
      this.students[grade] = []
    }
    this.students[grade].push(student)
  }

  grade(grade: number): string[] {
    return this.students[grade] ? [...this.students[grade]].sort() : []
  }
}
