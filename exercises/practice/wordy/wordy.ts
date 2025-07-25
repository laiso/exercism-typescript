export const answer = (question: string): number => {
  // Remove "What is" and "?" from the question
  const match = question.match(/^What is (.+)\?$/)
  if (!match) {
    throw new Error('Unknown operation')
  }

  const expression = match[1].trim()
  if (!expression) {
    throw new Error('Syntax error')
  }

  // Split into tokens, handling negative numbers
  const tokens = tokenize(expression)
  
  if (tokens.length === 0) {
    throw new Error('Syntax error')
  }

  // If just a single number, return it
  if (tokens.length === 1) {
    if (isNumber(tokens[0])) {
      return parseFloat(tokens[0])
    } else {
      throw new Error('Syntax error')
    }
  }

  // Parse and evaluate the expression
  return evaluateTokens(tokens)
}

function tokenize(expression: string): string[] {
  // Replace "multiplied by" and "divided by" with single words
  const normalized = expression
    .replace(/multiplied by/g, 'multiplied')
    .replace(/divided by/g, 'divided')

  // Split by spaces and filter out empty strings
  return normalized.split(/\s+/).filter(token => token.length > 0)
}

function isNumber(token: string): boolean {
  return /^-?\d+$/.test(token)
}

function isOperator(token: string): boolean {
  return ['plus', 'minus', 'multiplied', 'divided'].includes(token)
}

function evaluateTokens(tokens: string[]): number {
  // First token should be a number
  if (!isNumber(tokens[0])) {
    throw new Error('Syntax error')
  }

  let result = parseFloat(tokens[0])
  let i = 1

  while (i < tokens.length) {
    // Expect operator
    if (i >= tokens.length || !isOperator(tokens[i])) {
      throw new Error('Syntax error')
    }
    const operator = tokens[i]

    // Expect number after operator
    if (i + 1 >= tokens.length || !isNumber(tokens[i + 1])) {
      throw new Error('Syntax error')
    }
    const operand = parseFloat(tokens[i + 1])

    // Apply operation
    switch (operator) {
      case 'plus':
        result += operand
        break
      case 'minus':
        result -= operand
        break
      case 'multiplied':
        result *= operand
        break
      case 'divided':
        result /= operand
        break
      default:
        throw new Error('Unknown operation')
    }

    i += 2
  }

  // Check for invalid syntax patterns
  if (i !== tokens.length) {
    throw new Error('Syntax error')
  }

  return result
}
