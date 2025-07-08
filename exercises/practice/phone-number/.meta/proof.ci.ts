export function clean(phoneNumber: string): string {
  const digits = phoneNumber.replace(/\D/g, '')
  
  if (digits.length < 10 || digits.length > 11) {
    throw new Error('Invalid phone number')
  }
  
  if (digits.length === 11) {
    if (digits[0] !== '1') {
      throw new Error('Invalid phone number')
    }
    return digits.slice(1)
  }
  
  if (digits[0] === '0' || digits[0] === '1') {
    throw new Error('Invalid phone number')
  }
  
  if (digits[3] === '0' || digits[3] === '1') {
    throw new Error('Invalid phone number')
  }
  
  return digits
}
