export class List {
  private values: number[]

  constructor(values: number[] = []) {
    this.values = values
  }

  compare(other: List): string {
    if (this.values.length === other.values.length) {
      return this.isEqual(other) ? 'EQUAL' : 'UNEQUAL'
    }
    
    if (this.values.length < other.values.length) {
      return this.isSublistOf(other) ? 'SUBLIST' : 'UNEQUAL'
    }
    
    return other.isSublistOf(this) ? 'SUPERLIST' : 'UNEQUAL'
  }

  private isEqual(other: List): boolean {
    return this.values.every((val, index) => val === other.values[index])
  }

  private isSublistOf(other: List): boolean {
    if (this.values.length === 0) return true
    
    for (let i = 0; i <= other.values.length - this.values.length; i++) {
      if (this.values.every((val, index) => val === other.values[i + index])) {
        return true
      }
    }
    return false
  }
}
