export function isValid(isbn: string): boolean {
  const cleanIsbn = isbn.replace(/[-\s]/g, '')
  
  if (cleanIsbn.length !== 10) {
    return false
  }
  
  for (let i = 0; i < 9; i++) {
    if (!/\d/.test(cleanIsbn[i])) {
      return false
    }
  }
  
  if (!/[\dX]/.test(cleanIsbn[9])) {
    return false
  }
  
  let sum = 0
  for (let i = 0; i < 9; i++) {
    sum += parseInt(cleanIsbn[i]) * (10 - i)
  }
  
  const checkDigit = cleanIsbn[9] === 'X' ? 10 : parseInt(cleanIsbn[9])
  sum += checkDigit
  
  return sum % 11 === 0
}
