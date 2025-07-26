export function hey(message: string): string {
  const trimmed = message.trim()
  
  if (trimmed === '') {
    return 'Fine. Be that way!'
  }
  
  const isQuestion = trimmed.endsWith('?')
  const hasLetters = /[a-zA-Z]/.test(trimmed)
  const isYelling = hasLetters && trimmed === trimmed.toUpperCase()
  
  if (isQuestion && isYelling) {
    return "Calm down, I know what I'm doing!"
  } else if (isQuestion) {
    return 'Sure.'
  } else if (isYelling) {
    return 'Whoa, chill out!'
  } else {
    return 'Whatever.'
  }
}