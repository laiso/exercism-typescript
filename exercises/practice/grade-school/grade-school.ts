export class GradeSchool {
  private students: { [grade: number]: string[] } = {}
  private addedStudents = new Set<string>()

  roster(): { [grade: number]: string[] } {
    const result: { [grade: number]: string[] } = {}
    
    // Sort grades and students within each grade
    for (const grade of Object.keys(this.students).map(Number).sort()) {
      result[grade] = [...this.students[grade]].sort()
    }
    
    return result
  }

  add(name: string, grade: number): void {
    // Don't add if student already exists
    if (this.addedStudents.has(name)) {
      return
    }
    
    this.addedStudents.add(name)
    
    if (!this.students[grade]) {
      this.students[grade] = []
    }
    
    this.students[grade].push(name)
  }

  grade(grade: number): string[] {
    return this.students[grade] ? [...this.students[grade]].sort() : []
  }
}
