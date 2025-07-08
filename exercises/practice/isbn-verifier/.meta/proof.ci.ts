export function isValid(isbn: string): boolean {
  const cleaned = isbn.replace(/-/g, '')
  
  if (cleaned.length !== 10) {
    return false
  }
  
  let sum = 0
  for (let i = 0; i < 9; i++) {
    const digit = parseInt(cleaned[i])
    if (isNaN(digit)) {
      return false
    }
    sum += digit * (10 - i)
  }
  
  const lastChar = cleaned[9]
  if (lastChar === 'X') {
    sum += 10
  } else {
    const lastDigit = parseInt(lastChar)
    if (isNaN(lastDigit)) {
      return false
    }
    sum += lastDigit
  }
  
  return sum % 11 === 0
}
