export function clean(phoneNumber: string): string {
  // Remove all non-digit characters
  const digits = phoneNumber.replace(/\D/g, '')
  
  // Handle different digit lengths
  if (digits.length < 10) {
    throw new Error('Incorrect number of digits')
  } else if (digits.length === 10) {
    // Validate area code and exchange code
    if (digits[0] === '0') {
      throw new Error('Area code cannot start with zero')
    }
    if (digits[0] === '1') {
      throw new Error('Area code cannot start with one')
    }
    if (digits[3] === '0') {
      throw new Error('Exchange code cannot start with zero')
    }
    if (digits[3] === '1') {
      throw new Error('Exchange code cannot start with one')
    }
    return digits
  } else if (digits.length === 11) {
    if (digits[0] !== '1') {
      throw new Error('11 digits must start with 1')
    }
    // Validate area code and exchange code  
    if (digits[1] === '0') {
      throw new Error('Area code cannot start with zero')
    }
    if (digits[1] === '1') {
      throw new Error('Area code cannot start with one')
    }
    if (digits[4] === '0') {
      throw new Error('Exchange code cannot start with zero')
    }
    if (digits[4] === '1') {
      throw new Error('Exchange code cannot start with one')
    }
    return digits.substring(1) // Remove country code
  } else {
    throw new Error('More than 11 digits')
  }
}
