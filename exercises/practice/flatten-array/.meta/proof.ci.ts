export function flatten(arr: any[]): number[] {
  const result: number[] = []
  
  for (const item of arr) {
    if (Array.isArray(item)) {
      result.push(...flatten(item))
    } else if (item !== null && item !== undefined) {
      result.push(item)
    }
  }
  
  return result
}