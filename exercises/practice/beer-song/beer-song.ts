export function verse(index: number): string {
  if (index === 0) {
    return 'No more bottles of beer on the wall, no more bottles of beer.\nGo to the store and buy some more, 99 bottles of beer on the wall.\n'
  } else if (index === 1) {
    return '1 bottle of beer on the wall, 1 bottle of beer.\nTake it down and pass it around, no more bottles of beer on the wall.\n'
  } else if (index === 2) {
    return '2 bottles of beer on the wall, 2 bottles of beer.\nTake one down and pass it around, 1 bottle of beer on the wall.\n'
  } else {
    return `${index} bottles of beer on the wall, ${index} bottles of beer.\nTake one down and pass it around, ${index - 1} bottles of beer on the wall.\n`
  }
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
