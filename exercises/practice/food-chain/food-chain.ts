export function verse(verseNumber: number): string {
  const animals = [
    { name: 'fly', action: '' },
    { name: 'spider', action: 'It wriggled and jiggled and tickled inside her.' },
    { name: 'bird', action: 'How absurd to swallow a bird!' },
    { name: 'cat', action: 'Imagine that, to swallow a cat!' },
    { name: 'dog', action: 'What a hog, to swallow a dog!' },
    { name: 'goat', action: 'Just opened her throat and swallowed a goat!' },
    { name: 'cow', action: 'I don\'t know how she swallowed a cow!' },
    { name: 'horse', action: 'She\'s dead, of course!' }
  ]

  if (verseNumber === 8) {
    return 'I know an old lady who swallowed a horse.\nShe\'s dead, of course!\n'
  }

  let result = `I know an old lady who swallowed a ${animals[verseNumber - 1].name}.`
  
  if (animals[verseNumber - 1].action) {
    result += `\n${animals[verseNumber - 1].action}`
  }

  for (let i = verseNumber - 1; i > 0; i--) {
    if (i === 2) {
      result += `\nShe swallowed the ${animals[i].name} to catch the ${animals[i - 1].name} that wriggled and jiggled and tickled inside her.`
    } else {
      result += `\nShe swallowed the ${animals[i].name} to catch the ${animals[i - 1].name}.`
    }
  }

  result += '\nI don\'t know why she swallowed the fly. Perhaps she\'ll die.\n'

  return result
}

export function verses(start: number, end: number): string {
  const result = []
  for (let i = start; i <= end; i++) {
    result.push(verse(i).trimEnd())
  }
  return result.join('\n\n') + '\n'
}
