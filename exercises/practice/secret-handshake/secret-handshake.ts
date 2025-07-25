export function commands(num: number): string[] {
  const actions = [
    'wink',
    'double blink', 
    'close your eyes',
    'jump'
  ]
  
  const result: string[] = []
  
  // Check each bit position
  for (let i = 0; i < 4; i++) {
    if (num & (1 << i)) {
      result.push(actions[i])
    }
  }
  
  // Check if we should reverse (5th bit)
  if (num & 16) {
    result.reverse()
  }
  
  return result
}
