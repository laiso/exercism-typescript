export function translate(phrase: string): string {
  return phrase.split(' ').map(word => translateWord(word)).join(' ')
}

function translateWord(word: string): string {
  const vowels = 'aeiou'
  const vowelSound = /^[aeiou]|^xr|^yt/
  
  if (vowelSound.test(word)) {
    return word + 'ay'
  }
  
  const consonantCluster = word.match(/^([^aeiou]*qu|[^aeiou]+)/)
  if (consonantCluster) {
    const cluster = consonantCluster[1]
    return word.slice(cluster.length) + cluster + 'ay'
  }
  
  return word + 'ay'
}
