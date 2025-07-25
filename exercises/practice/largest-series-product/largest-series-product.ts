export const largestProduct = (digits: string, span: number): number => {
  if (span < 0) {
    throw new Error('Span must be greater than zero');
  }
  
  if (span > digits.length) {
    throw new Error('Span must be smaller than string length');
  }
  
  if (digits === '') {
    throw new Error('Digits input must not be empty');
  }
  
  // Check for non-digits
  if (!/^\d+$/.test(digits)) {
    throw new Error('Digits input must only contain digits');
  }
  
  if (span === 0) {
    return 1;
  }
  
  let maxProduct = 0;
  
  for (let i = 0; i <= digits.length - span; i++) {
    let product = 1;
    for (let j = i; j < i + span; j++) {
      product *= parseInt(digits[j], 10);
    }
    maxProduct = Math.max(maxProduct, product);
  }
  
  return maxProduct;
}
