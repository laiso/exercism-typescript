export class CustomSet {
  private elements: Set<unknown>

  constructor(initial?: unknown[]) {
    this.elements = new Set(initial || [])
  }

  empty(): boolean {
    return this.elements.size === 0
  }

  contains(element: unknown): boolean {
    return this.elements.has(element)
  }

  add(element: unknown): CustomSet {
    const newSet = new CustomSet()
    newSet.elements = new Set(this.elements)
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
    
    for (const element of this.elements) {
      if (!other.contains(element)) {
        return false
      }
    }
    return true
  }

  union(other: CustomSet): CustomSet {
    const newSet = new CustomSet()
    newSet.elements = new Set(this.elements)
    for (const element of other.elements) {
      newSet.elements.add(element)
    }
    return newSet
  }

  intersection(other: CustomSet): CustomSet {
    const newSet = new CustomSet()
    for (const element of this.elements) {
      if (other.contains(element)) {
        newSet.elements.add(element)
      }
    }
    return newSet
  }

  difference(other: CustomSet): CustomSet {
    const newSet = new CustomSet()
    for (const element of this.elements) {
      if (!other.contains(element)) {
        newSet.elements.add(element)
      }
    }
    return newSet
  }
}
