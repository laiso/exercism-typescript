export function translate(text: string): string {
  return text.split(' ').map(translateWord).join(' ')
}

function translateWord(word: string): string {
  const vowels = 'aeiou'
  
  // Rule 1: Words starting with vowels get 'ay' added
  if (vowels.includes(word[0])) {
    return word + 'ay'
  }
  
  // Find the first vowel position, considering 'y' rules
  let firstVowelIndex = -1
  for (let i = 0; i < word.length; i++) {
    const char = word[i]
    if (vowels.includes(char) || (char === 'y' && i > 0)) {
      firstVowelIndex = i
      break
    }
  }
  
  // Handle special consonant clusters
  let consonantCluster = ''
  
  // Check for 'qu' patterns
  const quIndex = word.indexOf('qu')
  if (quIndex === 0) {
    consonantCluster = 'qu'
  } else if (quIndex === 1 && !vowels.includes(word[0])) {
    consonantCluster = word[0] + 'qu'
  } else {
    // Find consonant cluster at the beginning
    for (let i = 0; i < word.length; i++) {
      const char = word[i]
      if (vowels.includes(char) || (char === 'y' && i > 0)) {
        break
      }
      consonantCluster += char
    }
  }
  
  // Move consonant cluster to end and add 'ay'
  const remainder = word.slice(consonantCluster.length)
  return remainder + consonantCluster + 'ay'
}
