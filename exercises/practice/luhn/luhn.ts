export function valid(digitString: string): boolean {
  const cleaned = digitString.replace(/\s/g, '')

  if (cleaned.length <= 1 || /[^0-9]/.test(cleaned)) {
    return false
  }

  let sum = 0
  let double = false
  for (let i = cleaned.length - 1; i >= 0; i--) {
    let digit = Number(cleaned[i])
    if (double) {
      digit *= 2
      if (digit > 9) {
        digit -= 9
      }
    }
    sum += digit
    double = !double
  }

  return sum % 10 === 0
}
