export function commands(handshake: number): string[] {
  const actions = ['wink', 'double blink', 'close your eyes', 'jump']
  const result: string[] = []
  
  for (let i = 0; i < 4; i++) {
    if (handshake & (1 << i)) {
      result.push(actions[i])
    }
  }
  
  if (handshake & 16) {
    result.reverse()
  }
  
  return result
}
