export function valid(digitString: string): boolean {
  // Remove spaces
  const cleaned = digitString.replace(/\s/g, '')
  
  // Must be at least 2 characters
  if (cleaned.length < 2) {
    return false
  }
  
  // Must contain only digits
  if (!/^\d+$/.test(cleaned)) {
    return false
  }
  
  let sum = 0
  let shouldDouble = false
  
  // Process digits from right to left
  for (let i = cleaned.length - 1; i >= 0; i--) {
    let digit = parseInt(cleaned[i], 10)
    
    if (shouldDouble) {
      digit *= 2
      if (digit > 9) {
        digit -= 9
      }
    }
    
    sum += digit
    shouldDouble = !shouldDouble
  }
  
  return sum % 10 === 0
}
