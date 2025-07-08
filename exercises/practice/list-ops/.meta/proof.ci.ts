export class List<T> {
  private values: T[]

  public static create<U>(...values: U[]): List<U> {
    return new List(...values)
  }

  constructor(...values: T[]) {
    this.values = values
  }

  forEach(fn: (value: T) => void): void {
    for (const value of this.values) {
      fn(value)
    }
  }

  filter(fn: (value: T) => boolean): List<T> {
    const result: T[] = []
    for (const value of this.values) {
      if (fn(value)) {
        result.push(value)
      }
    }
    return new List(...result)
  }

  length(): number {
    return this.values.length
  }

  map<U>(fn: (value: T) => U): List<U> {
    const result: U[] = []
    for (const value of this.values) {
      result.push(fn(value))
    }
    return new List(...result)
  }

  foldl<U>(fn: (acc: U, value: T) => U, acc: U): U {
    let result = acc
    for (const value of this.values) {
      result = fn(result, value)
    }
    return result
  }

  foldr<U>(fn: (acc: U, value: T) => U, acc: U): U {
    let result = acc
    for (let i = this.values.length - 1; i >= 0; i--) {
      result = fn(result, this.values[i])
    }
    return result
  }

  reverse(): List<T> {
    const result: T[] = []
    for (let i = this.values.length - 1; i >= 0; i--) {
      result.push(this.values[i])
    }
    return new List(...result)
  }

  concat(other: List<T>): List<T> {
    const result = [...this.values]
    other.forEach(value => result.push(value))
    return new List(...result)
  }

  append(value: T): List<T> {
    return new List(...this.values, value)
  }
}
