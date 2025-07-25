export function valid(digitString: string): boolean {
  // Remove spaces
  const cleaned = digitString.replace(/\s/g, '')
  
  // Check if length > 1 and all characters are digits
  if (cleaned.length <= 1 || !/^\d+$/.test(cleaned)) {
    return false
  }
  
  const digits = cleaned.split('').map(Number)
  let sum = 0
  
  // Process from right to left
  for (let i = digits.length - 1; i >= 0; i--) {
    let digit = digits[i]
    
    // Double every second digit from the right (even index when counting from 0)
    if ((digits.length - 1 - i) % 2 === 1) {
      digit *= 2
      if (digit > 9) {
        digit -= 9
      }
    }
    
    sum += digit
  }
  
  return sum % 10 === 0
}
