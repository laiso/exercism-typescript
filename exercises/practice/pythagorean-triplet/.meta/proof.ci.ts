type Options = {
  minFactor?: number
  maxFactor?: number
  sum: number
}

export function triplets({ minFactor = 1, maxFactor = 1000, sum }: Options): Triplet[] {
  const result: Triplet[] = []
  
  for (let a = minFactor; a <= maxFactor; a++) {
    for (let b = a; b <= maxFactor; b++) {
      const c = sum - a - b
      if (c >= b && c <= maxFactor && a * a + b * b === c * c) {
        result.push(new Triplet(a, b, c))
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
