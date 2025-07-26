export function accumulate<T, U>(list: T[], accumulator: (item: T) => U): U[] {
  const result: U[] = []
  for (const item of list) {
    result.push(accumulator(item))
  }
  return result
}