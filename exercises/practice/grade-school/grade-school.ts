export class GradeSchool {
  private _roster: { [grade: number]: string[] } = {}

  roster(): { [grade: number]: string[] } {
    const result: { [grade: number]: string[] } = {}
    for (const grade in this._roster) {
      const gradeNum = parseInt(grade, 10)
      result[gradeNum] = [...this._roster[gradeNum]].sort()
    }
    return result
  }

  add(student: string, grade: number): void {
    // Remove student from any previous grade
    for (const g in this._roster) {
      const index = this._roster[g].indexOf(student)
      if (index !== -1) {
        this._roster[g].splice(index, 1)
        if (this._roster[g].length === 0) {
          delete this._roster[g]
        }
      }
    }
    
    // Add student to new grade
    if (!this._roster[grade]) {
      this._roster[grade] = []
    }
    this._roster[grade].push(student)
  }

  grade(grade: number): string[] {
    if (!this._roster[grade]) {
      return []
    }
    return [...this._roster[grade]].sort()
  }
}
