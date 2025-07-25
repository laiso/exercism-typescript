type Options = {
  minFactor?: number
  maxFactor?: number
  sum: number
}

export function triplets({ minFactor = 1, maxFactor = Infinity, sum }: Options): Triplet[] {
  const result: Triplet[] = []
  
  // For Pythagorean triplets where a < b < c and a + b + c = sum
  // We have a² + b² = c² and a + b + c = sum
  // So c = sum - a - b, and we need a² + b² = (sum - a - b)²
  
  for (let a = minFactor; a <= maxFactor && a < sum / 3; a++) {
    for (let b = a + 1; b <= maxFactor && a + b < sum; b++) {
      const c = sum - a - b
      
      if (c > b && c >= minFactor && c <= maxFactor) {
        if (a * a + b * b === c * c) {
          result.push(new Triplet(a, b, c))
        }
      }
    }
  }
  
  return result
}

class Triplet {
  private a: number
  private b: number 
  private c: number

  constructor(a: number, b: number, c: number) {
    this.a = a
    this.b = b
    this.c = c
  }

  toArray(): [number, number, number] {
    return [this.a, this.b, this.c]
  }
}
