//
// This is only a SKELETON file for the 'Kindergarten Garden' exercise.
// It's been provided as a convenience to get you started writing code faster.
//

const DEFAULT_STUDENTS: Student[] = [
  'Alice',
  'Bob',
  'Charlie',
  'David',
  'Eve',
  'Fred',
  'Ginny',
  'Harriet',
  'Ileana',
  'Joseph',
  'Kincaid',
  'Larry',
]

const PLANT_CODES = {
  G: 'grass',
  V: 'violets',
  R: 'radishes',
  C: 'clover',
} as const

type Student = string
type Plant = (typeof PLANT_CODES)[keyof typeof PLANT_CODES]
type Plants = Plant[]
type Pots = Plants[]

export class Garden {
  private diagram: string
  private students: Student[]

  constructor(diagram: string, students = DEFAULT_STUDENTS) {
    this.diagram = diagram
    this.students = [...students].sort()
  }

  public plants(student: Student): Plants {
    const studentIndex = this.students.indexOf(student)
    if (studentIndex === -1) {
      throw new Error('Student not found')
    }
    
    const rows = this.diagram.split('\n')
    const plantIndex = studentIndex * 2
    
    const result: Plants = []
    for (const row of rows) {
      if (row[plantIndex]) {
        result.push(PLANT_CODES[row[plantIndex] as keyof typeof PLANT_CODES])
      }
      if (row[plantIndex + 1]) {
        result.push(PLANT_CODES[row[plantIndex + 1] as keyof typeof PLANT_CODES])
      }
    }
    
    return result
  }
}
