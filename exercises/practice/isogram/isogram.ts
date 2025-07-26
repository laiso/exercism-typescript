export function isIsogram(str: string): boolean {
  // Convert to lowercase and remove spaces and hyphens
  const cleaned = str.toLowerCase().replace(/[-\s]/g, '')
  
  // Check for duplicate characters
  const seen = new Set<string>()
  
  for (const char of cleaned) {
    if (seen.has(char)) {
      return false
    }
    seen.add(char)
  }
  
  return true
}
