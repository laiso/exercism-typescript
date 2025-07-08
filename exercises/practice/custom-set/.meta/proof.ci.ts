export class CustomSet {
  private elements: Set<number>

  constructor(initial?: number[]) {
    this.elements = new Set(initial || [])
  }

  empty(): boolean {
    return this.elements.size === 0
  }

  contains(element: number): boolean {
    return this.elements.has(element)
  }

  add(element: number): CustomSet {
    const newSet = new CustomSet([...this.elements])
    newSet.elements.add(element)
    return newSet
  }

  subset(other: CustomSet): boolean {
    for (const element of this.elements) {
      if (!other.contains(element)) {
        return false
      }
    }
    return true
  }

  disjoint(other: CustomSet): boolean {
    for (const element of this.elements) {
      if (other.contains(element)) {
        return false
      }
    }
    return true
  }

  eql(other: CustomSet): boolean {
    if (this.elements.size !== other.elements.size) {
      return false
    }
    return this.subset(other)
  }

  union(other: CustomSet): CustomSet {
    const result = new CustomSet([...this.elements])
    for (const element of other.elements) {
      result.elements.add(element)
    }
    return result
  }

  intersection(other: CustomSet): CustomSet {
    const result = new CustomSet()
    for (const element of this.elements) {
      if (other.contains(element)) {
        result.elements.add(element)
      }
    }
    return result
  }

  difference(other: CustomSet): CustomSet {
    const result = new CustomSet()
    for (const element of this.elements) {
      if (!other.contains(element)) {
        result.elements.add(element)
      }
    }
    return result
  }
}
