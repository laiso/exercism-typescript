export function solve(puzzle: string): Record<string, number> | undefined {
  // Parse the puzzle to extract words and operation
  const parts = puzzle.split('==').map(part => part.trim())
  if (parts.length !== 2) {
    return undefined
  }
  
  const leftSide = parts[0]
  const rightSide = parts[1]
  
  // Extract all words from both sides
  const leftWords = leftSide.split('+').map(word => word.trim())
  const rightWords = [rightSide]
  
  // Get all unique letters
  const allLetters = new Set<string>()
  const allWords = [...leftWords, ...rightWords]
  
  for (const word of allWords) {
    for (const letter of word) {
      if (letter.match(/[A-Z]/)) {
        allLetters.add(letter)
      }
    }
  }
  
  const letters = Array.from(allLetters)
  
  // Try all possible digit assignments
  const usedDigits = new Set<number>()
  const assignment: Record<string, number> = {}
  
  return solveRecursive(letters, 0, usedDigits, assignment, leftWords, rightWords)
}

function solveRecursive(
  letters: string[],
  index: number,
  usedDigits: Set<number>,
  assignment: Record<string, number>,
  leftWords: string[],
  rightWords: string[]
): Record<string, number> | undefined {
  // If we've assigned all letters, check if the equation is valid
  if (index === letters.length) {
    if (isValidEquation(assignment, leftWords, rightWords)) {
      return { ...assignment }
    }
    return undefined
  }
  
  const currentLetter = letters[index]
  
  // Try each digit for the current letter
  for (let digit = 0; digit <= 9; digit++) {
    if (usedDigits.has(digit)) {
      continue
    }
    
    // Check if this would create a leading zero
    if (digit === 0 && isLeadingLetter(currentLetter, leftWords, rightWords)) {
      continue
    }
    
    assignment[currentLetter] = digit
    usedDigits.add(digit)
    
    const result = solveRecursive(letters, index + 1, usedDigits, assignment, leftWords, rightWords)
    if (result) {
      return result
    }
    
    usedDigits.delete(digit)
    delete assignment[currentLetter]
  }
  
  return undefined
}

function isLeadingLetter(letter: string, leftWords: string[], rightWords: string[]): boolean {
  const allWords = [...leftWords, ...rightWords]
  return allWords.some(word => word.length > 1 && word[0] === letter)
}

function isValidEquation(
  assignment: Record<string, number>,
  leftWords: string[],
  rightWords: string[]
): boolean {
  // Convert words to numbers
  const leftSum = leftWords.reduce((sum, word) => sum + wordToNumber(word, assignment), 0)
  const rightSum = rightWords.reduce((sum, word) => sum + wordToNumber(word, assignment), 0)
  
  return leftSum === rightSum
}

function wordToNumber(word: string, assignment: Record<string, number>): number {
  let result = 0
  for (const letter of word) {
    result = result * 10 + assignment[letter]
  }
  return result
}
