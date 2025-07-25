export function score(x: number, y: number): number {
  const distanceSquared = x * x + y * y
  
  if (distanceSquared <= 1) {
    return 10  // Inner circle (radius 1)
  } else if (distanceSquared <= 25) {
    return 5   // Middle circle (radius 5)
  } else if (distanceSquared <= 100) {
    return 1   // Outer circle (radius 10)
  } else {
    return 0   // Outside the target
  }
}
