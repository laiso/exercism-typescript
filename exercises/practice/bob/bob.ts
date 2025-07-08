export function hey(message: unknown): unknown {
  const msg = String(message).trim()
  
  if (msg === '') {
    return 'Fine. Be that way!'
  }
  
  const hasLetters = /[a-zA-Z]/.test(msg)
  const isQuestion = msg.endsWith('?')
  const isShouting = hasLetters && msg === msg.toUpperCase()
  
  if (isShouting && isQuestion) {
    return "Calm down, I know what I'm doing!"
  }
  
  if (isShouting) {
    return 'Whoa, chill out!'
  }
  
  if (isQuestion) {
    return 'Sure.'
  }
  
  return 'Whatever.'
}
