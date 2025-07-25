export function keep<T>(collection: T[], predicate: (item: T) => boolean): T[] {
  const result: T[] = []
  
  for (const item of collection) {
    if (predicate(item)) {
      result.push(item)
    }
  }
  
  return result
}

export function discard<T>(collection: T[], predicate: (item: T) => boolean): T[] {
  const result: T[] = []
  
  for (const item of collection) {
    if (!predicate(item)) {
      result.push(item)
    }
  }
  
  return result
}
