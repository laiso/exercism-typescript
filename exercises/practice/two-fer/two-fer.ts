export function twoFer(name?: string): string {
  const person = name || 'you'
  return `One for ${person}, one for me.`
}
