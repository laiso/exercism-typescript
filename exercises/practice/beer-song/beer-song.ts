export function verse(index: number): string {
  if (index === 0) {
    return `No more bottles of beer on the wall, no more bottles of beer.
Go to the store and buy some more, 99 bottles of beer on the wall.
`
  }
  
  if (index === 1) {
    return `1 bottle of beer on the wall, 1 bottle of beer.
Take it down and pass it around, no more bottles of beer on the wall.
`
  }
  
  const nextBottles = index - 1
  const bottleWord = index === 1 ? 'bottle' : 'bottles'
  const nextBottleWord = nextBottles === 1 ? 'bottle' : 'bottles'
  
  return `${index} ${bottleWord} of beer on the wall, ${index} ${bottleWord} of beer.
Take one down and pass it around, ${nextBottles} ${nextBottleWord} of beer on the wall.
`
}

export function sing(
  initialBottlesCount: number = 99,
  takeDownCount: number = 0
): string {
  const verses: string[] = []
  
  for (let i = initialBottlesCount; i >= takeDownCount; i--) {
    verses.push(verse(i))
  }
  
  return verses.join('\n')
}
