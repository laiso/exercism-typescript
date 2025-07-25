const subjects = [
  '',
  'house that Jack built',
  'malt',
  'rat',
  'cat',
  'dog',
  'cow with the crumpled horn',
  'maiden all forlorn',
  'man all tattered and torn',
  'priest all shaven and shorn',
  'rooster that crowed in the morn',
  'farmer sowing his corn',
  'horse and the hound and the horn'
];

const actions = [
  '',
  '',
  'that lay in the',
  'that ate the',
  'that killed the',
  'that worried the',
  'that tossed the',
  'that milked the',
  'that kissed the',
  'that married the',
  'that woke the',
  'that kept the',
  'that belonged to the'
];

export function verse(verseNumber: number): string[] {
  const lines: string[] = [];
  
  // First line
  lines.push(`This is the ${subjects[verseNumber]}`);
  
  // Subsequent lines
  for (let i = verseNumber - 1; i >= 1; i--) {
    if (i === 1) {
      lines.push(`${actions[i + 1]} ${subjects[i]}.`);
    } else {
      lines.push(`${actions[i + 1]} ${subjects[i]}`);
    }
  }
  
  return lines;
}

export function verses(start: number, end: number): string[] {
  const result: string[] = [];
  
  for (let i = start; i <= end; i++) {
    if (i > start) {
      result.push(''); // Empty line between verses
    }
    result.push(...verse(i));
  }
  
  return result;
}
