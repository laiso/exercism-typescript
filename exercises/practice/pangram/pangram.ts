export function isPangram(sentence: string): boolean {
  const letters = new Set<string>()
  
  for (const char of sentence.toLowerCase()) {
    if (char >= 'a' && char <= 'z') {
      letters.add(char)
    }
  }
  
  return letters.size === 26
}
