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
  
  return `${index} bottles of beer on the wall, ${index} bottles of beer.
Take one down and pass it around, ${index - 1} ${index - 1 === 1 ? 'bottle' : 'bottles'} of beer on the wall.
`
}

export function sing(
  initialBottlesCount: number = 99,
  finalBottlesCount: number = 0
): string {
  const verses: string[] = []
  
  for (let i = initialBottlesCount; i >= finalBottlesCount; i--) {
    verses.push(verse(i))
  }
  
  return verses.join('\n')
}