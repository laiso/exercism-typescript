export function hey(message: string): string {
  const trimmed = message.trim()
  
  // Check for silence (empty or only whitespace)
  if (trimmed === '') {
    return 'Fine. Be that way!'
  }
  
  // Check if it's a question (ends with ?)
  const isQuestion = trimmed.endsWith('?')
  
  // Check if it's yelling (all caps and contains letters)
  const hasLetters = /[a-zA-Z]/.test(trimmed)
  const isYelling = hasLetters && trimmed === trimmed.toUpperCase()
  
  // Determine response based on conditions
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
