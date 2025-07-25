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
  private readonly rows: string[]
  private readonly students: Student[]

  constructor(diagram: string, students = DEFAULT_STUDENTS) {
    this.rows = diagram.split('\n')
    this.students = [...students].sort() // Sort students alphabetically
  }

  public plants(student: Student): Plants {
    const studentIndex = this.students.indexOf(student)
    if (studentIndex === -1) {
      return []
    }

    // Each student gets 2 consecutive pots (starting at studentIndex * 2)
    const startIndex = studentIndex * 2
    const plants: Plants = []

    // Get plants from first row
    plants.push(PLANT_CODES[this.rows[0][startIndex] as keyof typeof PLANT_CODES])
    plants.push(PLANT_CODES[this.rows[0][startIndex + 1] as keyof typeof PLANT_CODES])

    // Get plants from second row
    plants.push(PLANT_CODES[this.rows[1][startIndex] as keyof typeof PLANT_CODES])
    plants.push(PLANT_CODES[this.rows[1][startIndex + 1] as keyof typeof PLANT_CODES])

    return plants
  }
}
