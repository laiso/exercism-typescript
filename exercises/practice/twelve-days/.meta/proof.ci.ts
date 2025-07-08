export function recite(startVerse: number, endVerse: number): string {
  const gifts = [
    'a Partridge in a Pear Tree',
    'two Turtle Doves',
    'three French Hens',
    'four Calling Birds',
    'five Gold Rings',
    'six Geese-a-Laying',
    'seven Swans-a-Swimming',
    'eight Maids-a-Milking',
    'nine Ladies Dancing',
    'ten Lords-a-Leaping',
    'eleven Pipers Piping',
    'twelve Drummers Drumming'
  ]

  const ordinals = [
    'first', 'second', 'third', 'fourth', 'fifth', 'sixth',
    'seventh', 'eighth', 'ninth', 'tenth', 'eleventh', 'twelfth'
  ]

  const result: string[] = []

  for (let verse = startVerse; verse <= endVerse; verse++) {
    let line = `On the ${ordinals[verse - 1]} day of Christmas my true love gave to me: `
    
    for (let gift = verse - 1; gift >= 0; gift--) {
      if (gift === 0 && verse > 1) {
        line += `and ${gifts[gift]}`
      } else {
        line += gifts[gift]
      }
      
      if (gift > 0) {
        line += ', '
      }
    }
    
    line += '.'
    result.push(line)
  }

  return result.join('\n') + '\n'
}
