export function proverb(items: string[]): string {
  if (items.length === 0) {
    return ''
  }
  
  const lines: string[] = []
  
  for (let i = 0; i < items.length - 1; i++) {
    lines.push(`For want of a ${items[i]} the ${items[i + 1]} was lost.`)
  }
  
  lines.push(`And all for the want of a ${items[0]}.`)
  
  return lines.join('\n')
}
