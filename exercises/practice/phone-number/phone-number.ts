export function clean(phoneNumber: string): string {
  if (/[a-zA-Z]/.test(phoneNumber)) {
    throw new Error('Letters not permitted')
  }
  if (/[@:!]/.test(phoneNumber)) {
    throw new Error('Punctuations not permitted')
  }

  const cleaned = phoneNumber.replace(/\D/g, '')

  if (cleaned.length > 11) {
    throw new Error('More than 11 digits')
  }
  if (cleaned.length < 10) {
    throw new Error('Incorrect number of digits')
  }
  if (cleaned.length === 11) {
    if (cleaned[0] !== '1') {
      throw new Error('11 digits must start with 1')
    }
    return cleaned.substring(1)
  }

  const areaCode = cleaned.substring(0, 3)
  const exchangeCode = cleaned.substring(3, 6)

  if (areaCode[0] === '0') {
    throw new Error('Area code cannot start with zero')
  }
  if (areaCode[0] === '1') {
    throw new Error('Area code cannot start with one')
  }
  if (exchangeCode[0] === '0') {
    throw new Error('Exchange code cannot start with zero')
  }
  if (exchangeCode[0] === '1') {
    throw new Error('Exchange code cannot start with one')
  }

  return cleaned
}
