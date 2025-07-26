export function distance(a: string, b: string): number {
  if (a.length !== b.length) {
    throw new Error('Strands must be of equal length.')
  }
  
  let count = 0
  for (let i = 0; i < a.length; i++) {
    if (a[i] !== b[i]) {
      count++
    }
  }
  
  return count
}