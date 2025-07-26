export class CustomSet {
  private data: Set<number>

  constructor(initial?: number[]) {
    this.data = new Set(initial || [])
  }

  empty(): boolean {
    return this.data.size === 0
  }

  contains(element: number): boolean {
    return this.data.has(element)
  }

  add(element: number): CustomSet {
    const newSet = new CustomSet([...this.data])
    newSet.data.add(element)
    return newSet
  }

  subset(other: CustomSet): boolean {
    for (const element of this.data) {
      if (!other.contains(element)) {
        return false
      }
    }
    return true
  }

  disjoint(other: CustomSet): boolean {
    for (const element of this.data) {
      if (other.contains(element)) {
        return false
      }
    }
    return true
  }

  eql(other: CustomSet): boolean {
    if (this.data.size !== other.data.size) {
      return false
    }
    return this.subset(other)
  }

  union(other: CustomSet): CustomSet {
    const result = new CustomSet([...this.data])
    for (const element of other.data) {
      result.data.add(element)
    }
    return result
  }

  intersection(other: CustomSet): CustomSet {
    const result = new CustomSet()
    for (const element of this.data) {
      if (other.contains(element)) {
        result.data.add(element)
      }
    }
    return result
  }

  difference(other: CustomSet): CustomSet {
    const result = new CustomSet()
    for (const element of this.data) {
      if (!other.contains(element)) {
        result.data.add(element)
      }
    }
    return result
  }
}
