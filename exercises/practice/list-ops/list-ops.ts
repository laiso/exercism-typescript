export class List<T = unknown> {
  public static create<T>(...values: T[]): List<T> {
    // Do *not* construct any array literal ([]) in your solution.
    // Do *not* construct any arrays through new Array in your solution.
    // DO *not* use any of the Array.prototype methods in your solution.

    // You may use the destructuring and spreading (...) syntax from Iterable.
    const list = new List<T>()
    list.values = values
    return list
  }

  private values: T[] = []

  public append(other: List<T>): List<T> {
    const result = new List<T>()
    result.values = [...this.values, ...other.values]
    return result
  }

  public concat(lists: List<List<T>>): List<T> {
    let result: List<T> = this
    lists.forEach((list: List<T>) => {
      result = result.append(list)
    })
    return result
  }

  public filter(predicate: (value: T) => boolean): List<T> {
    const result = new List<T>()
    const filtered: T[] = []
    for (const value of this.values) {
      if (predicate(value)) {
        filtered[filtered.length] = value
      }
    }
    result.values = filtered
    return result
  }

  public map<U>(transform: (value: T) => U): List<U> {
    const result = new List<U>()
    const mapped: U[] = []
    for (const value of this.values) {
      mapped[mapped.length] = transform(value)
    }
    result.values = mapped
    return result
  }

  public length(): number {
    let count = 0
    for (const _ of this.values) {
      count++
    }
    return count
  }

  public foldl<U>(fn: (acc: U, value: T) => U, initial: U): U {
    let accumulator = initial
    for (const value of this.values) {
      accumulator = fn(accumulator, value)
    }
    return accumulator
  }

  public foldr<U>(fn: (acc: U, value: T) => U, initial: U): U {
    let accumulator = initial
    for (let i = this.values.length - 1; i >= 0; i--) {
      accumulator = fn(accumulator, this.values[i])
    }
    return accumulator
  }

  public reverse(): List<T> {
    const result = new List<T>()
    const reversed: T[] = []
    for (let i = this.values.length - 1; i >= 0; i--) {
      reversed[reversed.length] = this.values[i]
    }
    result.values = reversed
    return result
  }

  public forEach(callback: (value: T) => void): void {
    for (const value of this.values) {
      callback(value)
    }
  }
}
