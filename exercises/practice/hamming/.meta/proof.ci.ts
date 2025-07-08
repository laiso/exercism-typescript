export function compute(left: string, right: string): number {
  if (left.length !== right.length) {
    throw new Error('strands must be of equal length')
  }
  
  let count = 0
  for (let i = 0; i < left.length; i++) {
    if (left[i] !== right[i]) {
      count++
    }
  }
  return count
}
