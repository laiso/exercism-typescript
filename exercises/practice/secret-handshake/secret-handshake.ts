export function commands(input: number): string[] {
  const actions = ['wink', 'double blink', 'close your eyes', 'jump'];
  const result: string[] = [];
  
  // Check each bit (0-3) to see if the corresponding action is included
  for (let i = 0; i < 4; i++) {
    if (input & (1 << i)) {
      result.push(actions[i]);
    }
  }
  
  // Check bit 4 (value 16) to see if we should reverse
  if (input & 16) {
    result.reverse();
  }
  
  return result;
}
