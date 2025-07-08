export function verse(verseNumber: number): string[] {
  const subjects = [
    'the house that Jack built.',
    'the malt',
    'the rat',
    'the cat',
    'the dog',
    'the cow with the crumpled horn',
    'the maiden all forlorn',
    'the man all tattered and torn',
    'the priest all shaven and shorn',
    'the rooster that crowed in the morn',
    'the farmer sowing his corn',
    'the horse and the hound and the horn'
  ]
  
  const actions = [
    '',
    'that lay in the house that Jack built.',
    'that ate the malt',
    'that killed the rat',
    'that worried the cat',
    'that tossed the dog',
    'that milked the cow with the crumpled horn',
    'that kissed the maiden all forlorn',
    'that married the man all tattered and torn',
    'that woke the priest all shaven and shorn',
    'that kept the rooster that crowed in the morn',
    'that belonged to the farmer sowing his corn'
  ]
  
  const result: string[] = []
  
  result.push(`This is ${subjects[verseNumber - 1]}`)
  
  for (let i = verseNumber - 1; i > 0; i--) {
    result.push(actions[i])
  }
  
  return result
}

export function verses(start: number, end: number): string[] {
  const result: string[] = []
  for (let i = start; i <= end; i++) {
    const verseLines = verse(i)
    result.push(...verseLines)
    if (i < end) {
      result.push('')
    }
  }
  return result
}
