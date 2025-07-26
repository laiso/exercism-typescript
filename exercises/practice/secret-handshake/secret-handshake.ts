const ACTIONS = ['wink', 'double blink', 'close your eyes', 'jump']

export function commands(n: number): string[] {
  const result: string[] = []
  for (let i = 0; i < ACTIONS.length; i++) {
    if ((n >> i) & 1) {
      result.push(ACTIONS[i])
    }
  }

  if ((n >> 4) & 1) {
    result.reverse()
  }

  return result
}
