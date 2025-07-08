export function solve(puzzle: string): Record<string, number> | undefined {
  // Parse the puzzle
  const parts = puzzle.split(' == ')
  if (parts.length !== 2) return undefined
  
  const leftSide = parts[0]
  const rightSide = parts[1]
  
  // Extract words from left side (split by +)
  const leftWords = leftSide.split(' + ').map(word => word.trim())
  const rightWord = rightSide.trim()
  
  // Get all unique letters
  const allLetters = new Set<string>()
  ;[...leftWords, rightWord].forEach(word => {
    for (const char of word) {
      if (char >= 'A' && char <= 'Z') {
        allLetters.add(char)
      }
    }
  })
  
  const letters = Array.from(allLetters)
  
  // Get leading letters (can't be zero)
  const leadingLetters = new Set<string>()
  ;[...leftWords, rightWord].forEach(word => {
    if (word.length > 0) {
      leadingLetters.add(word[0])
    }
  })
  
  // Try all permutations of digits
  const digits = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
  
  function tryPermutation(usedDigits: Set<number>, letterIndex: number): Record<string, number> | undefined {
    if (letterIndex === letters.length) {
      // Check if the equation is valid
      return checkEquation()
    }
    
    const currentLetter = letters[letterIndex]
    const isLeading = leadingLetters.has(currentLetter)
    
    for (let digit = isLeading ? 1 : 0; digit <= 9; digit++) {
      if (!usedDigits.has(digit)) {
        usedDigits.add(digit)
        letterToDigit[currentLetter] = digit
        
        const result = tryPermutation(usedDigits, letterIndex + 1)
        if (result) return result
        
        usedDigits.delete(digit)
        delete letterToDigit[currentLetter]
      }
    }
    
    return undefined
  }
  
  const letterToDigit: Record<string, number> = {}
  
  function checkEquation(): Record<string, number> | undefined {
    // Convert words to numbers
    let leftSum = 0
    for (const word of leftWords) {
      const num = wordToNumber(word)
      if (num === undefined) return undefined
      leftSum += num
    }
    
    const rightNum = wordToNumber(rightWord)
    if (rightNum === undefined) return undefined
    
    if (leftSum === rightNum) {
      return { ...letterToDigit }
    }
    
    return undefined
  }
  
  function wordToNumber(word: string): number | undefined {
    if (word.length === 0) return 0
    
    let result = 0
    for (const char of word) {
      if (char < 'A' || char > 'Z') continue
      const digit = letterToDigit[char]
      if (digit === undefined) return undefined
      result = result * 10 + digit
    }
    return result
  }
  
  return tryPermutation(new Set(), 0)
}
