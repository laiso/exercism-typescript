export function isValid(isbn: string): boolean {
  // Remove hyphens
  const cleaned = isbn.replace(/-/g, '');
  
  // Must be exactly 10 characters
  if (cleaned.length !== 10) {
    return false;
  }
  
  // Check format: 9 digits followed by digit or X
  const regex = /^\d{9}[\dX]$/;
  if (!regex.test(cleaned)) {
    return false;
  }
  
  // Calculate checksum
  let sum = 0;
  for (let i = 0; i < 10; i++) {
    const char = cleaned[i];
    const value = char === 'X' ? 10 : parseInt(char, 10);
    sum += value * (10 - i);
  }
  
  return sum % 11 === 0;
}
