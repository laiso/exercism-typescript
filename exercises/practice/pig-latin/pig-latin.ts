export function translate(phrase: string): string {
  return phrase.split(' ').map(word => translateWord(word)).join(' ')
}

function translateWord(word: string): string {
  const vowelSound = /^[aeiou]|^xr|^yt/
  
  if (vowelSound.test(word)) {
    return word + 'ay'
  }
  
  const consonantY = word.match(/^([^aeiou]+)y/)
  if (consonantY) {
    const consonants = consonantY[1]
    const rest = word.slice(consonants.length)
    return rest + consonants + 'ay'
  }
  
  const consonantQu = word.match(/^([^aeiou]*qu)/)
  if (consonantQu) {
    const cluster = consonantQu[1]
    const rest = word.slice(cluster.length)
    return rest + cluster + 'ay'
  }
  
  const consonantCluster = word.match(/^([^aeiou]+)/)
  if (consonantCluster) {
    const cluster = consonantCluster[1]
    const rest = word.slice(cluster.length)
    return rest + cluster + 'ay'
  }
  
  return word + 'ay'
}
