export function valid(digitString: string): boolean {
  const cleaned = digitString.replace(/\s/g, '')
  
  if (cleaned.length <= 1 || !/^\d+$/.test(cleaned)) {
    return false
  }
  
  let sum = 0
  let isSecond = false
  
  for (let i = cleaned.length - 1; i >= 0; i--) {
    let digit = parseInt(cleaned[i])
    
    if (isSecond) {
      digit *= 2
      if (digit > 9) {
        digit -= 9
      }
    }
    
    sum += digit
    isSecond = !isSecond
  }
  
  return sum % 10 === 0
}
