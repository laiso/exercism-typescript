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
  const dp = Array(maximumWeight + 1).fill(0)
  
  for (const item of items) {
    for (let weight = maximumWeight; weight >= item.weight; weight--) {
      dp[weight] = Math.max(dp[weight], dp[weight - item.weight] + item.value)
    }
  }
  
  return dp[maximumWeight]
}
