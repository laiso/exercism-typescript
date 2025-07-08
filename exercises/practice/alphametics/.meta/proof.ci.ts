export function solve(puzzle: string): { [key: string]: number } | undefined {
  const parts = puzzle.split(' == ')
  if (parts.length !== 2) return undefined
  
  const left = parts[0]
  const right = parts[1]
  
  const letters = new Set<string>()
  for (const char of puzzle) {
    if (/[A-Z]/.test(char)) {
      letters.add(char)
    }
  }
  
  const letterArray = Array.from(letters)
  if (letterArray.length > 10) return undefined
  
  const firstLetters = new Set<string>()
  const words = left.split(' + ').concat([right])
  for (const word of words) {
    if (word.length > 0) {
      firstLetters.add(word[0])
    }
  }
  
  function isValid(assignment: { [key: string]: number }): boolean {
    for (const letter of firstLetters) {
      if (assignment[letter] === 0) return false
    }
    
    const leftWords = left.split(' + ')
    let leftSum = 0
    
    for (const word of leftWords) {
      let wordValue = 0
      for (const char of word) {
        wordValue = wordValue * 10 + assignment[char]
      }
      leftSum += wordValue
    }
    
    let rightValue = 0
    for (const char of right) {
      rightValue = rightValue * 10 + assignment[char]
    }
    
    return leftSum === rightValue
  }
  
  function backtrack(index: number, assignment: { [key: string]: number }, used: Set<number>): { [key: string]: number } | undefined {
    if (index === letterArray.length) {
      return isValid(assignment) ? assignment : undefined
    }
    
    const letter = letterArray[index]
    for (let digit = 0; digit <= 9; digit++) {
      if (!used.has(digit)) {
        assignment[letter] = digit
        used.add(digit)
        
        const result = backtrack(index + 1, assignment, used)
        if (result) return result
        
        delete assignment[letter]
        used.delete(digit)
      }
    }
    
    return undefined
  }
  
  return backtrack(0, {}, new Set())
}
