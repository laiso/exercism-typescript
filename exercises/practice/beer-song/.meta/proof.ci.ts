export function verse(index: number): string {
  if (index === 0) {
    return 'No more bottles of beer on the wall, no more bottles of beer.\nGo to the store and buy some more, 99 bottles of beer on the wall.\n'
  }
  
  const bottles = (n: number) => n === 1 ? '1 bottle' : n === 0 ? 'no more bottles' : `${n} bottles`
  const bottlesCapitalized = (n: number) => n === 0 ? 'No more bottles' : bottles(n)
  
  return `${bottlesCapitalized(index)} of beer on the wall, ${bottles(index)} of beer.\nTake ${index === 1 ? 'it' : 'one'} down and pass it around, ${bottles(index - 1)} of beer on the wall.\n`
}

export function sing(
  initialBottlesCount: number = 99,
  takeDownCount: number = 0
): string {
  const verses: string[] = []
  const endBottle = takeDownCount === 0 ? 0 : takeDownCount
  for (let i = initialBottlesCount; i >= endBottle; i--) {
    verses.push(verse(i))
  }
  return verses.join('\n')
}
