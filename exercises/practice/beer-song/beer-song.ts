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
  const bottleText = index === 1 ? 'bottle' : 'bottles'
  const nextBottleText = nextBottles === 1 ? 'bottle' : 'bottles'
  
  return `${index} ${bottleText} of beer on the wall, ${index} ${bottleText} of beer.
Take one down and pass it around, ${nextBottles} ${nextBottleText} of beer on the wall.
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
