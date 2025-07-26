export enum Classification {
  EQUAL = 'equal',
  SUBLIST = 'sublist',
  SUPERLIST = 'superlist',
  UNEQUAL = 'unequal'
}

export class List {
  private values: number[]

  constructor(...values: number[]) {
    this.values = values
  }

  compare(other: List): Classification {
    const thisValues = this.values
    const otherValues = other.values

    if (thisValues.length === otherValues.length && 
        thisValues.every((val, index) => val === otherValues[index])) {
      return Classification.EQUAL
    }

    if (this.isSublistOf(otherValues, thisValues)) {
      return Classification.SUBLIST
    }

    if (this.isSublistOf(thisValues, otherValues)) {
      return Classification.SUPERLIST
    }

    return Classification.UNEQUAL
  }

  private isSublistOf(superlist: number[], sublist: number[]): boolean {
    if (sublist.length === 0) return true
    if (sublist.length > superlist.length) return false

    for (let i = 0; i <= superlist.length - sublist.length; i++) {
      if (superlist.slice(i, i + sublist.length).every((val, index) => val === sublist[index])) {
        return true
      }
    }
    return false
  }
}
