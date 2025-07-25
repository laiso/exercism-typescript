export function recite(startVerse: number, endVerse: number): string {
  const days = [
    '', 'first', 'second', 'third', 'fourth', 'fifth', 'sixth',
    'seventh', 'eighth', 'ninth', 'tenth', 'eleventh', 'twelfth'
  ];
  
  const gifts = [
    '', 'a Partridge in a Pear Tree', 'two Turtle Doves', 'three French Hens',
    'four Calling Birds', 'five Gold Rings', 'six Geese-a-Laying',
    'seven Swans-a-Swimming', 'eight Maids-a-Milking', 'nine Ladies Dancing',
    'ten Lords-a-Leaping', 'eleven Pipers Piping', 'twelve Drummers Drumming'
  ];
  
  const verses: string[] = [];
  
  for (let day = startVerse; day <= endVerse; day++) {
    let verse = `On the ${days[day]} day of Christmas my true love gave to me: `;
    
    const giftList: string[] = [];
    for (let i = day; i >= 1; i--) {
      if (i === 1 && day > 1) {
        giftList.push(`and ${gifts[i]}`);
      } else {
        giftList.push(gifts[i]);
      }
    }
    
    verse += giftList.join(', ') + '.\n';
    verses.push(verse);
  }
  
  return verses.join('');
}
