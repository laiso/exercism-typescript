export function solve(puzzle: string): Record<string, number> | undefined {
  const parts = puzzle.split(' == ')
  if (parts.length !== 2) return undefined
  
  const left = parts[0]
  const right = parts[1]
  
  const letters = Array.from(new Set(puzzle.match(/[A-Z]/g) || []))
  if (letters.length > 10) return undefined
  
  const firstLetters = new Set()
  const words = left.split(' + ').concat([right])
  for (const word of words) {
    if (word.length > 1) {
      firstLetters.add(word[0])
    }
  }
  
  function* permutations(arr: number[], r: number): Generator<number[]> {
    if (r === 0) {
      yield []
      return
    }
    for (let i = 0; i < arr.length; i++) {
      const rest = arr.slice(0, i).concat(arr.slice(i + 1))
      for (const p of permutations(rest, r - 1)) {
        yield [arr[i], ...p]
      }
    }
  }
  
  for (const perm of permutations([0, 1, 2, 3, 4, 5, 6, 7, 8, 9], letters.length)) {
    const mapping: Record<string, number> = {}
    let valid = true
    
    for (let i = 0; i < letters.length; i++) {
      const letter = letters[i]
      const digit = perm[i]
      
      if (firstLetters.has(letter) && digit === 0) {
        valid = false
        break
      }
      
      mapping[letter] = digit
    }
    
    if (!valid) continue
    
    const leftTerms = left.split(' + ').map(word => {
      return parseInt(word.split('').map(c => mapping[c]).join(''), 10)
    })
    const rightValue = parseInt(right.split('').map(c => mapping[c]).join(''), 10)
    
    const leftSum = leftTerms.reduce((sum, term) => sum + term, 0)
    
    if (leftSum === rightValue) {
      return mapping
    }
  }
  
  return undefined
}
