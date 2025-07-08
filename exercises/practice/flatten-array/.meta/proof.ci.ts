export function flatten(array: unknown[]): unknown[] {
  const result: unknown[] = []
  
  for (const item of array) {
    if (Array.isArray(item)) {
      result.push(...flatten(item))
    } else if (item !== null && item !== undefined) {
      result.push(item)
    }
  }
  
  return result
}
