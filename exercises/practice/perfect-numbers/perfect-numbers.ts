export function classify(num: number): string {
  if (num <= 0) {
    throw new Error('Classification is only possible for natural numbers.')
  }
  
  if (num === 1) {
    return 'deficient'
  }
  
  let aliquotSum = 1 // 1 is always a factor
  
  // Find all factors from 2 to sqrt(num)
  for (let i = 2; i * i <= num; i++) {
    if (num % i === 0) {
      aliquotSum += i
      // Add the corresponding factor if it's different from i
      if (i !== num / i) {
        aliquotSum += num / i
      }
    }
  }
  
  if (aliquotSum === num) {
    return 'perfect'
  } else if (aliquotSum > num) {
    return 'abundant'
  } else {
    return 'deficient'
  }
}
