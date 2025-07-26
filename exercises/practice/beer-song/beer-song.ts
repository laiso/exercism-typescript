function bottleText(n: number): string {
  if (n === 0) return 'no more bottles'
  if (n === 1) return '1 bottle'
  return `${n} bottles`
}

export function verse(n: number): string {
  const next = n - 1
  switch (n) {
    case 0:
      return `No more bottles of beer on the wall, no more bottles of beer.\nGo to the store and buy some more, 99 bottles of beer on the wall.\n`
    case 1:
      return `1 bottle of beer on the wall, 1 bottle of beer.\nTake it down and pass it around, no more bottles of beer on the wall.\n`
    default:
      return `${bottleText(n)} of beer on the wall, ${bottleText(
        n
      )} of beer.\nTake one down and pass it around, ${bottleText(
        next
      )} of beer on the wall.\n`
  }
}

export function sing(start = 99, end = 0): string {
  let result = ''
  for (let i = start; i >= end; i--) {
    result += verse(i)
    if (i > end) {
      result += '\n'
    }
  }
  return result
}
