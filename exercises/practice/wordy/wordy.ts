export const answer = (question: string): number => {
  if (!question.endsWith('?')) {
    throw new Error('Unknown operation')
  }
  
  const cleanQuestion = question.replace(/What is |[?]/g, '').trim()
  
  if (cleanQuestion === '') {
    throw new Error('Unknown operation')
  }
  
  const tokens = cleanQuestion.split(/\s+/)
  
  if (tokens.length === 1) {
    const num = parseInt(tokens[0])
    if (isNaN(num)) {
      throw new Error('Unknown operation')
    }
    return num
  }
  
  let result = parseInt(tokens[0])
  if (isNaN(result)) {
    throw new Error('Unknown operation')
  }
  
  for (let i = 1; i < tokens.length; i += 2) {
    const operator = tokens[i]
    const operand = parseInt(tokens[i + 1])
    
    if (isNaN(operand)) {
      throw new Error('Unknown operation')
    }
    
    switch (operator) {
      case 'plus':
        result += operand
        break
      case 'minus':
        result -= operand
        break
      case 'multiplied':
        if (tokens[i + 2] === 'by') {
          i++
          const nextOperand = parseInt(tokens[i + 2])
          if (isNaN(nextOperand)) {
            throw new Error('Unknown operation')
          }
          result *= nextOperand
          i++
        } else {
          throw new Error('Unknown operation')
        }
        break
      case 'divided':
        if (tokens[i + 2] === 'by') {
          i++
          const nextOperand = parseInt(tokens[i + 2])
          if (isNaN(nextOperand)) {
            throw new Error('Unknown operation')
          }
          result /= nextOperand
          i++
        } else {
          throw new Error('Unknown operation')
        }
        break
      default:
        throw new Error('Unknown operation')
    }
  }
  
  return result
}
