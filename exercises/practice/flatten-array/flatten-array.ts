export function flatten(arr: unknown[]): number[] {
  const result: number[] = []
  
  for (const item of arr) {
    if (Array.isArray(item)) {
      result.push(...flatten(item))
    } else if (item !== null && item !== undefined) {
      result.push(item as number)
    }
  }
  
  return result
}
