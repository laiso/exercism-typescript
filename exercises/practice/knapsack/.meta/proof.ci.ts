type Item = {
  weight: number
  value: number
}

export function maximumValue({
  maximumWeight,
  items,
}: {
  maximumWeight: number
  items: Item[]
}): number {
  const dp: number[][] = Array(items.length + 1)
    .fill(null)
    .map(() => Array(maximumWeight + 1).fill(0))
  
  for (let i = 1; i <= items.length; i++) {
    const item = items[i - 1]
    for (let w = 0; w <= maximumWeight; w++) {
      if (item.weight <= w) {
        dp[i][w] = Math.max(
          dp[i - 1][w],
          dp[i - 1][w - item.weight] + item.value
        )
      } else {
        dp[i][w] = dp[i - 1][w]
      }
    }
  }
  
  return dp[items.length][maximumWeight]
}
