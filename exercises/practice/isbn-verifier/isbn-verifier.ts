export function isValid(isbn: string): boolean {
  // Remove hyphens and convert to uppercase
  const cleaned = isbn.replace(/-/g, '').toUpperCase()
  
  // Check length (should be exactly 10 characters)
  if (cleaned.length !== 10) {
    return false
  }
  
  // Check that all characters are valid (digits 0-9 or X as last character)
  for (let i = 0; i < 9; i++) {
    if (!/[0-9]/.test(cleaned[i])) {
      return false
    }
  }
  
  // Check last character (should be digit or X)
  if (!/[0-9X]/.test(cleaned[9])) {
    return false
  }
  
  // Calculate checksum
  let sum = 0
  for (let i = 0; i < 10; i++) {
    const digit = cleaned[i] === 'X' ? 10 : parseInt(cleaned[i], 10)
    sum += digit * (10 - i)
  }
  
  return sum % 11 === 0
}
