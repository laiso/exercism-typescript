const animals = [
  { name: 'fly', comment: '', special: '' },
  { name: 'spider', comment: 'It wriggled and jiggled and tickled inside her.', special: 'that wriggled and jiggled and tickled inside her' },
  { name: 'bird', comment: 'How absurd to swallow a bird!', special: '' },
  { name: 'cat', comment: 'Imagine that, to swallow a cat!', special: '' },
  { name: 'dog', comment: 'What a hog, to swallow a dog!', special: '' },
  { name: 'goat', comment: 'Just opened her throat and swallowed a goat!', special: '' },
  { name: 'cow', comment: "I don't know how she swallowed a cow!", special: '' },
  { name: 'horse', comment: "She's dead, of course!", special: '' }
]

export function verse(verseNumber: number): string {
  const animal = animals[verseNumber - 1]
  
  if (verseNumber === 8) {
    // Special case for horse - she dies
    return `I know an old lady who swallowed a horse.
She's dead, of course!
`
  }
  
  let result = `I know an old lady who swallowed a ${animal.name}.\n`
  
  if (animal.comment) {
    result += `${animal.comment}\n`
  }
  
  // Build the chain of swallowing (from current animal down to fly)
  for (let i = verseNumber - 1; i >= 0; i--) {
    if (i === 0) {
      // This is the fly, no more swallowing
      break
    }
    
    const currentAnimal = animals[i - 1]
    const nextAnimal = animals[i - 2]
    
    if (i === 2) {
      // Special case for spider being caught by bird
      result += `She swallowed the ${currentAnimal.name} to catch the ${nextAnimal.name} ${currentAnimal.special}.\n`
    } else {
      result += `She swallowed the ${currentAnimal.name} to catch the ${nextAnimal.name}.\n`
    }
  }
  
  result += `I don't know why she swallowed the fly. Perhaps she'll die.\n`
  
  return result
}

export function verses(start: number, end: number): string {
  const result: string[] = []
  
  for (let i = start; i <= end; i++) {
    result.push(verse(i))
  }
  
  return result.join('\n')
}