export function clean(phoneNumber: string): string {
  if (/[a-zA-Z]/.test(phoneNumber)) {
    throw new Error('Letters not permitted')
  }
  
  if (/[^0-9\s.\-()+ ]/.test(phoneNumber)) {
    throw new Error('Punctuations not permitted')
  }
  
  const digits = phoneNumber.replace(/\D/g, '')
  
  if (digits.length < 10) {
    throw new Error('Incorrect number of digits')
  }
  
  if (digits.length > 11) {
    throw new Error('More than 11 digits')
  }
  
  if (digits.length === 11) {
    if (digits[0] !== '1') {
      throw new Error('11 digits must start with 1')
    }
    const number = digits.slice(1)
    return validateAndReturn(number)
  }
  
  if (digits.length === 10) {
    return validateAndReturn(digits)
  }
  
  throw new Error('Incorrect number of digits')
}

function validateAndReturn(number: string): string {
  if (number[0] === '0') {
    throw new Error('Area code cannot start with zero')
  }
  if (number[0] === '1') {
    throw new Error('Area code cannot start with one')
  }
  
  if (number[3] === '0') {
    throw new Error('Exchange code cannot start with zero')
  }
  if (number[3] === '1') {
    throw new Error('Exchange code cannot start with one')
  }
  
  return number
}
