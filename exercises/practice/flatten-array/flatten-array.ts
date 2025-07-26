export function flatten(input: any[]): any[] {
  const result: any[] = []
  
  for (const item of input) {
    if (item === null || item === undefined) {
      continue // Skip null/undefined values
    }
    
    if (Array.isArray(item)) {
      // Recursively flatten nested arrays
      result.push(...flatten(item))
    } else {
      // Add non-array items directly
      result.push(item)
    }
  }
  
  return result
}
