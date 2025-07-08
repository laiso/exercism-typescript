export function steps(count: number): number {
  if (count <= 0 || !Number.isInteger(count)) {
    throw new Error('Only positive integers are allowed')
  }
  
  if (count === 1) {
    return 0
  }
  
  let steps = 0
  let current = count
  
  while (current !== 1) {
    if (current % 2 === 0) {
      current = current / 2
    } else {
      current = current * 3 + 1
    }
    steps++
  }
  
  return steps
}
