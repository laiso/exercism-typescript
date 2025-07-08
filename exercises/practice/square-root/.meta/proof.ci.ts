export function squareRoot(radicand: number): number {
  if (radicand < 0) {
    throw new Error('Cannot calculate square root of negative number')
  }
  
  if (radicand === 0 || radicand === 1) {
    return radicand
  }
  
  let guess = radicand / 2
  let prevGuess = 0
  
  while (Math.abs(guess - prevGuess) > 0.000001) {
    prevGuess = guess
    guess = (guess + radicand / guess) / 2
  }
  
  return Math.floor(guess)
}
