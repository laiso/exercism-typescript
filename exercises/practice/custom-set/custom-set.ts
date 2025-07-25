export class CustomSet {
  private elements: number[]

  constructor(initial: number[] = []) {
    this.elements = [...new Set(initial)].sort((a, b) => a - b)
  }

  empty(): boolean {
    return this.elements.length === 0
  }

  contains(element: number): boolean {
    return this.elements.includes(element)
  }

  add(element: number): CustomSet {
    if (!this.contains(element)) {
      return new CustomSet([...this.elements, element])
    }
    return new CustomSet(this.elements)
  }

  subset(other: CustomSet): boolean {
    return this.elements.every(element => other.contains(element))
  }

  disjoint(other: CustomSet): boolean {
    return this.elements.every(element => !other.contains(element))
  }

  eql(other: CustomSet): boolean {
    return this.elements.length === other.elements.length && this.subset(other)
  }

  union(other: CustomSet): CustomSet {
    return new CustomSet([...this.elements, ...other.elements])
  }

  intersection(other: CustomSet): CustomSet {
    return new CustomSet(this.elements.filter(element => other.contains(element)))
  }

  difference(other: CustomSet): CustomSet {
    return new CustomSet(this.elements.filter(element => !other.contains(element)))
  }
}
