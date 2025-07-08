export function isIsogram(str: string): boolean {
  const letters = new Set<string>()
  
  for (const char of str.toLowerCase()) {
    if (char >= 'a' && char <= 'z') {
      if (letters.has(char)) {
        return false
      }
      letters.add(char)
    }
  }
  
  return true
}
