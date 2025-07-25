export function proverb(...items: string[]): string {
  if (items.length === 0) {
    return ''
  }
  
  if (items.length === 1) {
    return `And all for the want of a ${items[0]}.`
  }
  
  const lines: string[] = []
  
  // Generate the chain of consequences
  for (let i = 0; i < items.length - 1; i++) {
    lines.push(`For want of a ${items[i]} the ${items[i + 1]} was lost.`)
  }
  
  // Add the final line
  lines.push(`And all for the want of a ${items[0]}.`)
  
  return lines.join('\n')
}
