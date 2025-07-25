export function isValid(isbn: string): boolean {
  // Remove hyphens and convert to uppercase
  const cleaned = isbn.replace(/-/g, '').toUpperCase()
  
  // Check length
  if (cleaned.length !== 10) return false
  
  // Check if all characters are digits except possibly the last one
  for (let i = 0; i < 9; i++) {
    if (!/\d/.test(cleaned[i])) return false
  }
  
  // Last character can be digit or X
  if (!/[\dX]/.test(cleaned[9])) return false
  
  // Calculate checksum
  let sum = 0
  for (let i = 0; i < 10; i++) {
    const digit = cleaned[i] === 'X' ? 10 : parseInt(cleaned[i], 10)
    sum += digit * (10 - i)
  }
  
  return sum % 11 === 0
}
