export function verse(verseNumber: number): string {
  const animals = [
    { name: 'fly', action: '' },
    { name: 'spider', action: 'It wriggled and jiggled and tickled inside her.' },
    { name: 'bird', action: 'How absurd to swallow a bird!' },
    { name: 'cat', action: 'Imagine that, to swallow a cat!' },
    { name: 'dog', action: 'What a hog, to swallow a dog!' },
    { name: 'goat', action: 'Just opened her throat and swallowed a goat!' },
    { name: 'cow', action: "I don't know how she swallowed a cow!" },
    { name: 'horse', action: "She's dead, of course!" }
  ]

  if (verseNumber === 8) {
    return `I know an old lady who swallowed a ${animals[7].name}.\n${animals[7].action}`
  }

  let result = `I know an old lady who swallowed a ${animals[verseNumber - 1].name}.\n`
  
  if (animals[verseNumber - 1].action) {
    result += `${animals[verseNumber - 1].action}\n`
  }

  for (let i = verseNumber - 1; i > 0; i--) {
    const current = animals[i].name
    const previous = animals[i - 1].name
    
    if (i === 2) {
      result += `She swallowed the ${current} to catch the ${previous} that wriggled and jiggled and tickled inside her.\n`
    } else {
      result += `She swallowed the ${current} to catch the ${previous}.\n`
    }
  }

  result += "I don't know why she swallowed the fly. Perhaps she'll die."
  
  return result
}

export function verses(start: number, end: number): string {
  const result = []
  for (let i = start; i <= end; i++) {
    result.push(verse(i))
  }
  return result.join('\n\n')
}
