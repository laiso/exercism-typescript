export function steps(count: number): number {
  if (count <= 0 || !Number.isInteger(count)) {
    throw new Error('Only positive integers are allowed')
  }
  
  let steps = 0
  let n = count
  
  while (n !== 1) {
    if (n % 2 === 0) {
      n = n / 2
    } else {
      n = 3 * n + 1
    }
    steps++
  }
  
  return steps
}
