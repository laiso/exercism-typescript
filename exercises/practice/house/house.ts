const ITEMS = [
  'the house that Jack built',
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

const ACTIONS = [
  '',
  'lay in',
  'ate',
  'killed',
  'worried',
  'tossed',
  'milked',
  'kissed',
  'married',
  'woke',
  'kept',
  'belonged to'
]

export function verse(verseNumber: number): string[] {
  const result = []
  
  result.push(`This is ${ITEMS[verseNumber - 1]}`)
  
  for (let i = verseNumber - 1; i > 0; i--) {
    const action = ACTIONS[i]
    const nextSubject = ITEMS[i - 1]
    
    if (i === 1) {
      result.push(`that ${action} ${nextSubject}.`)
    } else {
      result.push(`that ${action} ${nextSubject}`)
    }
  }
  
  if (verseNumber === 1) {
    result[0] += '.'
  }
  
  return result
}

export function verses(start: number, end: number): string[] {
  const result = []
  for (let i = start; i <= end; i++) {
    result.push(...verse(i))
    if (i < end) {
      result.push('')
    }
  }
  return result
}
