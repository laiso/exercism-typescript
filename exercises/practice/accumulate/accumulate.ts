export function accumulate<T, U>(list: T[], accumulator: (item: T) => U): U[] {
  const result: U[] = []
  
  for (let i = 0; i < list.length; i++) {
    result.push(accumulator(list[i]))
  }
  
  return result
}
