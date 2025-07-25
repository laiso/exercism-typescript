export class List {
  private values: number[]

  constructor(...values: number[]) {
    this.values = values
  }

  compare(other: List): string {
    const thisStr = JSON.stringify(this.values)
    const otherStr = JSON.stringify(other.values)
    
    if (thisStr === otherStr) {
      return 'equal'
    }
    
    if (this.values.length === 0) {
      return 'sublist'
    }
    
    if (other.values.length === 0) {
      return 'superlist'
    }
    
    if (this.isSubsequence(this.values, other.values)) {
      return 'sublist'
    }
    
    if (this.isSubsequence(other.values, this.values)) {
      return 'superlist'
    }
    
    return 'unequal'
  }
  
  private isSubsequence(shorter: number[], longer: number[]): boolean {
    if (shorter.length > longer.length) return false
    
    for (let i = 0; i <= longer.length - shorter.length; i++) {
      let match = true
      for (let j = 0; j < shorter.length; j++) {
        if (longer[i + j] !== shorter[j]) {
          match = false
          break
        }
      }
      if (match) return true
    }
    
    return false
  }
}
