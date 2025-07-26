export function flatten(array: any[]): any[] {
  const result: any[] = []
  
  for (const item of array) {
    if (Array.isArray(item)) {
      result.push(...flatten(item))
    } else if (item !== null && item !== undefined) {
      result.push(item)
    }
  }
  
  return result
}
