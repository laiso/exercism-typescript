export function verse(bottles: number): string {
  if (bottles === 0) {
    return `No more bottles of beer on the wall, no more bottles of beer.
Go to the store and buy some more, 99 bottles of beer on the wall.
`
  }
  
  if (bottles === 1) {
    return `1 bottle of beer on the wall, 1 bottle of beer.
Take it down and pass it around, no more bottles of beer on the wall.
`
  }
  
  if (bottles === 2) {
    return `2 bottles of beer on the wall, 2 bottles of beer.
Take one down and pass it around, 1 bottle of beer on the wall.
`
  }
  
  return `${bottles} bottles of beer on the wall, ${bottles} bottles of beer.
Take one down and pass it around, ${bottles - 1} bottles of beer on the wall.
`
}

export function sing(
  initialBottlesCount = 99,
  takeDownCount = 0
): string {
  const verses: string[] = []
  
  for (let i = initialBottlesCount; i >= takeDownCount; i--) {
    verses.push(verse(i))
  }
  
  return verses.join('\n')
}
