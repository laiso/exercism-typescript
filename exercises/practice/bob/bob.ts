export function hey(message: string): string {
  message = message.trim()

  if (message === '') {
    return 'Fine. Be that way!'
  }

  const isQuestion = message.endsWith('?')
  const isYelling = message.toUpperCase() === message && /[A-Z]/.test(message)

  if (isYelling && isQuestion) {
    return "Calm down, I know what I'm doing!"
  }

  if (isYelling) {
    return 'Whoa, chill out!'
  }

  if (isQuestion) {
    return 'Sure.'
  }

  return 'Whatever.'
}
