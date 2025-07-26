const DAYS = [
  'first', 'second', 'third', 'fourth', 'fifth', 'sixth',
  'seventh', 'eighth', 'ninth', 'tenth', 'eleventh', 'twelfth'
]

const GIFTS = [
  'a Partridge in a Pear Tree', 'two Turtle Doves', 'three French Hens',
  'four Calling Birds', 'five Gold Rings', 'six Geese-a-Laying',
  'seven Swans-a-Swimming', 'eight Maids-a-Milking', 'nine Ladies Dancing',
  'ten Lords-a-Leaping', 'eleven Pipers Piping', 'twelve Drummers Drumming'
]

function getVerse(n: number): string {
  const day = DAYS[n - 1]
  const gifts = GIFTS.slice(0, n).reverse()
  const giftString = gifts.length > 1
    ? `${gifts.slice(0, -1).join(', ')}, and ${gifts.slice(-1)}`
    : gifts[0]

  return `On the ${day} day of Christmas my true love gave to me: ${giftString}.\n`
}

export function recite(start: number, end: number): string {
  let result = ''
  for (let i = start; i <= end; i++) {
    result += getVerse(i)
  }
  return result
}
