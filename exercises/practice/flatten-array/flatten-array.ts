export function flatten(arr: any[]): number[] {
  const result: number[] = []
  
  function flattenRecursive(item: any): void {
    if (Array.isArray(item)) {
      for (const element of item) {
        flattenRecursive(element)
      }
    } else if (item !== null && item !== undefined) {
      result.push(item)
    }
  }
  
  flattenRecursive(arr)
  return result
}
