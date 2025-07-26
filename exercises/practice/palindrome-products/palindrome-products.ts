interface Input {
  maxFactor: number
  minFactor?: number
}

export function generate(params: Input): { 
  smallest: { value: number | null; factors: number[][] };
  largest: { value: number | null; factors: number[][] };
}{
  const { minFactor = 1, maxFactor } = params
  
  if (minFactor > maxFactor) {
    throw new Error('min must be <= max')
  }
  
  const palindromes = new Map<number, number[][]>()
  
  for (let i = minFactor; i <= maxFactor; i++) {
    for (let j = i; j <= maxFactor; j++) {
      const product = i * j
      const productStr = product.toString()
      
      if (productStr === productStr.split('').reverse().join('')) {
        if (!palindromes.has(product)) {
          palindromes.set(product, [])
        }
        palindromes.get(product)!.push([i, j])
      }
    }
  }
  
  if (palindromes.size === 0) {
    return {
      smallest: {
        value: null,
        factors: []
      },
      largest: {
        value: null,
        factors: []
      }
    }
  }
  
  const sortedPalindromes = Array.from(palindromes.keys()).sort((a, b) => a - b)
  const smallestValue = sortedPalindromes[0]
  const largestValue = sortedPalindromes[sortedPalindromes.length - 1]
  
  return {
    smallest: {
      value: smallestValue,
      factors: palindromes.get(smallestValue)!
    },
    largest: {
      value: largestValue,
      factors: palindromes.get(largestValue)!
    }
  }
}
