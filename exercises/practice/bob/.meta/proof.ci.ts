export function hey(message: string): string {
  const trimmed = message.trim()
  
  if (trimmed === '') {
    return 'Fine. Be that way!'
  }
  
  const isQuestion = trimmed.endsWith('?')
  const isYelling = /[A-Z]/.test(trimmed) && trimmed === trimmed.toUpperCase()
  
  if (isQuestion && isYelling) {
    return "Calm down, I know what I'm doing!"
  }
  
  if (isQuestion) {
    return 'Sure.'
  }
  
  if (isYelling) {
    return 'Whoa, chill out!'
  }
  
  return 'Whatever.'
}
