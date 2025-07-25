export function isPaired(input: string): boolean {
  const stack: string[] = []
  const pairs: { [key: string]: string } = {
    ')': '(',
    ']': '[', 
    '}': '{'
  }
  
  for (const char of input) {
    if (['(', '[', '{'].includes(char)) {
      stack.push(char)
    } else if ([')', ']', '}'].includes(char)) {
      if (stack.length === 0 || stack.pop() !== pairs[char]) {
        return false
      }
    }
  }
  
  return stack.length === 0
}
