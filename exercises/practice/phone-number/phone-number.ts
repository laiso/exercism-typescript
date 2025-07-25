export function clean(phoneNumber: string): string {
  // Remove all non-digit characters
  const digitsOnly = phoneNumber.replace(/[^0-9]/g, '')
  
  // Check for letters
  if (/[a-zA-Z]/.test(phoneNumber)) {
    throw new Error('Letters not permitted')
  }
  
  // Check for punctuation other than allowed ones
  if (/[^0-9\s\-\(\)\.\+]/.test(phoneNumber)) {
    throw new Error('Punctuations not permitted')
  }
  
  // Check number of digits
  if (digitsOnly.length < 10) {
    throw new Error('Incorrect number of digits')
  }
  
  if (digitsOnly.length > 11) {
    throw new Error('More than 11 digits')
  }
  
  let number = digitsOnly
  
  if (digitsOnly.length === 11) {
    if (digitsOnly[0] !== '1') {
      throw new Error('11 digits must start with 1')
    }
    number = digitsOnly.slice(1)
  }
  
  if (digitsOnly.length === 9) {
    throw new Error('Incorrect number of digits')
  }
  
  // Validate area code (first 3 digits)
  if (number[0] === '0') {
    throw new Error('Area code cannot start with zero')
  }
  
  if (number[0] === '1') {
    throw new Error('Area code cannot start with one')
  }
  
  // Validate exchange code (next 3 digits)
  if (number[3] === '0') {
    throw new Error('Exchange code cannot start with zero')
  }
  
  if (number[3] === '1') {
    throw new Error('Exchange code cannot start with one')
  }
  
  return number
}
