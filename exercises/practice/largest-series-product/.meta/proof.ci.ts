export const largestProduct = (digits: string, span: number): number => {
  if (span < 0) {
    throw new Error('Span must not be negative')
  }
  
  if (span > digits.length) {
    throw new Error('Span must be smaller than string length')
  }
  
  if (digits.length === 0) {
    throw new Error('Digits input must not be empty')
  }
  
  if (!/^\d*$/.test(digits)) {
    throw new Error('Digits input must only contain digits')
  }
  
  if (span === 0) {
    return 1
  }
  
  let maxProduct = 0
  
  for (let i = 0; i <= digits.length - span; i++) {
    const substring = digits.slice(i, i + span)
    const product = substring.split('').reduce((acc, digit) => acc * parseInt(digit), 1)
    maxProduct = Math.max(maxProduct, product)
  }
  
  return maxProduct
}
