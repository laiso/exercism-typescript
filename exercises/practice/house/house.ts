const verseLines = [
  ['This is the house that Jack built.'],
  [
    'This is the malt',
    'that lay in the house that Jack built.'
  ],
  [
    'This is the rat',
    'that ate the malt',
    'that lay in the house that Jack built.'
  ],
  [
    'This is the cat',
    'that killed the rat',
    'that ate the malt',
    'that lay in the house that Jack built.'
  ],
  [
    'This is the dog',
    'that worried the cat',
    'that killed the rat',
    'that ate the malt',
    'that lay in the house that Jack built.'
  ],
  [
    'This is the cow with the crumpled horn',
    'that tossed the dog',
    'that worried the cat',
    'that killed the rat',
    'that ate the malt',
    'that lay in the house that Jack built.'
  ],
  [
    'This is the maiden all forlorn',
    'that milked the cow with the crumpled horn',
    'that tossed the dog',
    'that worried the cat',
    'that killed the rat',
    'that ate the malt',
    'that lay in the house that Jack built.'
  ],
  [
    'This is the man all tattered and torn',
    'that kissed the maiden all forlorn',
    'that milked the cow with the crumpled horn',
    'that tossed the dog',
    'that worried the cat',
    'that killed the rat',
    'that ate the malt',
    'that lay in the house that Jack built.'
  ],
  [
    'This is the priest all shaven and shorn',
    'that married the man all tattered and torn',
    'that kissed the maiden all forlorn',
    'that milked the cow with the crumpled horn',
    'that tossed the dog',
    'that worried the cat',
    'that killed the rat',
    'that ate the malt',
    'that lay in the house that Jack built.'
  ],
  [
    'This is the rooster that crowed in the morn',
    'that woke the priest all shaven and shorn',
    'that married the man all tattered and torn',
    'that kissed the maiden all forlorn',
    'that milked the cow with the crumpled horn',
    'that tossed the dog',
    'that worried the cat',
    'that killed the rat',
    'that ate the malt',
    'that lay in the house that Jack built.'
  ],
  [
    'This is the farmer sowing his corn',
    'that kept the rooster that crowed in the morn',
    'that woke the priest all shaven and shorn',
    'that married the man all tattered and torn',
    'that kissed the maiden all forlorn',
    'that milked the cow with the crumpled horn',
    'that tossed the dog',
    'that worried the cat',
    'that killed the rat',
    'that ate the malt',
    'that lay in the house that Jack built.'
  ],
  [
    'This is the horse and the hound and the horn',
    'that belonged to the farmer sowing his corn',
    'that kept the rooster that crowed in the morn',
    'that woke the priest all shaven and shorn',
    'that married the man all tattered and torn',
    'that kissed the maiden all forlorn',
    'that milked the cow with the crumpled horn',
    'that tossed the dog',
    'that worried the cat',
    'that killed the rat',
    'that ate the malt',
    'that lay in the house that Jack built.'
  ]
]

export function verse(n: number): string[] {
  if (n < 1 || n > 12) {
    throw new Error('Verse number must be between 1 and 12')
  }

  return [...verseLines[n - 1]]
}

export function verses(start: number, end: number): string[] {
  if (start < 1 || end > 12 || start > end) {
    throw new Error('Invalid verse range')
  }

  const result: string[] = []
  for (let i = start; i <= end; i++) {
    result.push(...verse(i))
    if (i < end) {
      result.push('') // Empty line between verses
    }
  }
  
  return result
}
