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

  const days = [
    'first', 'second', 'third', 'fourth', 'fifth', 'sixth',
    'seventh', 'eighth', 'ninth', 'tenth', 'eleventh', 'twelfth'
  ]

  const verses: string[] = []

  for (let day = startVerse; day <= endVerse; day++) {
    let verse = `On the ${days[day - 1]} day of Christmas my true love gave to me: `
    
    if (day === 1) {
      verse += gifts[0] + '.'
    } else {
      const dayGifts: string[] = []
      for (let i = day - 1; i >= 0; i--) {
        if (i === 0) {
          dayGifts.push('and ' + gifts[i])
        } else {
          dayGifts.push(gifts[i])
        }
      }
      verse += dayGifts.join(', ') + '.'
    }
    
    verses.push(verse)
  }

  return verses.join('\n')
}
