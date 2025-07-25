export class List {
  private values: number[]

  constructor(...values: number[]) {
    this.values = values
  }

  compare(other: List): string {
    const thisValues = this.values
    const otherValues = other.values
    
    // Check if equal
    if (thisValues.length === otherValues.length) {
      const isEqual = thisValues.every((val, index) => val === otherValues[index])
      if (isEqual) return 'equal'
    }
    
    // Check if this is a sublist of other
    if (thisValues.length < otherValues.length && this.isSublist(thisValues, otherValues)) {
      return 'sublist'
    }
    
    // Check if this is a superlist of other
    if (thisValues.length > otherValues.length && this.isSublist(otherValues, thisValues)) {
      return 'superlist'
    }
    
    return 'unequal'
  }
  
  private isSublist(smaller: number[], larger: number[]): boolean {
    if (smaller.length === 0) return true
    
    for (let i = 0; i <= larger.length - smaller.length; i++) {
      let match = true
      for (let j = 0; j < smaller.length; j++) {
        if (larger[i + j] !== smaller[j]) {
          match = false
          break
        }
      }
      if (match) return true
    }
    
    return false
  }
}
