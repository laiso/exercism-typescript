export function squareRoot(radicand: number): number {
  // Use Newton's method for integer square root
  if (radicand === 0) return 0
  
  let x = radicand
  let y = Math.floor((x + 1) / 2)
  
  while (y < x) {
    x = y
    y = Math.floor((x + radicand / x) / 2)
  }
  
  return x
}
