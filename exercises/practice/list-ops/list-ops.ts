export class List {
  private constructor(private data: any = undefined, private next: List | null = null) {}

  public static create(...values: unknown[]): List {
    // Do *not* construct any array literal ([]) in your solution.
    // Do *not* construct any arrays through new Array in your solution.
    // DO *not* use any of the Array.prototype methods in your solution.

    // You may use the destructuring and spreading (...) syntax from Iterable.
    let result = new List()
    for (const value of values) {
      result = result.append(value)
    }
    return result
  }

  public get length(): number {
    if (this.isEmpty()) return 0
    return 1 + (this.next?.length || 0)
  }

  public append(value: unknown): List {
    if (this.isEmpty()) {
      return new List(value, null)
    }
    return new List(this.data, this.next?.append(value) || new List(value, null))
  }

  public concat(other: List): List {
    if (this.isEmpty()) return other
    return new List(this.data, this.next?.concat(other) || other)
  }

  public filter(predicate: (value: unknown) => boolean): List {
    if (this.isEmpty()) return new List()
    
    const filteredRest = this.next?.filter(predicate) || new List()
    if (predicate(this.data)) {
      return new List(this.data, filteredRest.isEmpty() ? null : filteredRest)
    }
    return filteredRest
  }

  public map(mapper: (value: unknown) => unknown): List {
    if (this.isEmpty()) return new List()
    
    const mappedRest = this.next?.map(mapper) || new List()
    return new List(mapper(this.data), mappedRest.isEmpty() ? null : mappedRest)
  }

  public foldl(folder: (acc: unknown, value: unknown) => unknown, acc: unknown): unknown {
    if (this.isEmpty()) return acc
    const newAcc = folder(acc, this.data)
    return this.next?.foldl(folder, newAcc) || newAcc
  }

  public foldr(folder: (value: unknown, acc: unknown) => unknown, acc: unknown): unknown {
    if (this.isEmpty()) return acc
    const restResult = this.next?.foldr(folder, acc) || acc
    return folder(this.data, restResult)
  }

  public reverse(): List {
    return this.foldl((acc: List, value: unknown) => new List(value, acc.isEmpty() ? null : acc), new List()) as List
  }

  private isEmpty(): boolean {
    return this.data === undefined && this.next === null
  }
}
