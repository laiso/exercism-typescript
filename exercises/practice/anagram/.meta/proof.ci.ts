export function findAnagrams(word: string, candidates: string[]): string[] {
  const normalize = (str: string) => str.toLowerCase().split('').sort().join('')
  const normalizedWord = normalize(word)
  const lowerWord = word.toLowerCase()
  
  return candidates.filter(candidate => {
    const lowerCandidate = candidate.toLowerCase()
    return lowerCandidate !== lowerWord && normalize(candidate) === normalizedWord
  })
}