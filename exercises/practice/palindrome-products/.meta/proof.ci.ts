interface Input {
  maxFactor: number
  minFactor?: number
}

export function generate(params: Input): { smallest: { value: number; factors: number[][] }; largest: { value: number; factors: number[][] } } {
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
    throw new Error('no palindromes found')
  }
  
  const sortedPalindromes = Array.from(palindromes.keys()).sort((a, b) => a - b)
  const smallest = sortedPalindromes[0]
  const largest = sortedPalindromes[sortedPalindromes.length - 1]
  
  return {
    smallest: { value: smallest, factors: palindromes.get(smallest)! },
    largest: { value: largest, factors: palindromes.get(largest)! }
  }
}
