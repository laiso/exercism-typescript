export function hey(message: string): string {
  const trimmed = message.trim()
  
  // Silent
  if (trimmed === '') {
    return 'Fine. Be that way!'
  }
  
  const isQuestion = trimmed.endsWith('?')
  const hasLetters = /[a-zA-Z]/.test(trimmed)
  const isYelling = hasLetters && trimmed === trimmed.toUpperCase()
  
  // Yelling question
  if (isYelling && isQuestion) {
    return "Calm down, I know what I'm doing!"
  }
  
  // Yelling
  if (isYelling) {
    return 'Whoa, chill out!'
  }
  
  // Question
  if (isQuestion) {
    return 'Sure.'
  }
  
  // Everything else
  return 'Whatever.'
}
