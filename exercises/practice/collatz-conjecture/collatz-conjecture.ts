export function steps(count: number): number {
  // Validate input
  if (count <= 0 || !Number.isInteger(count)) {
    throw new Error('Only positive integers are allowed')
  }
  
  let steps = 0
  let n = count
  
  while (n !== 1) {
    if (n % 2 === 0) {
      // Even: divide by 2
      n = n / 2
    } else {
      // Odd: multiply by 3 and add 1
      n = 3 * n + 1
    }
    steps++
  }
  
  return steps
}
