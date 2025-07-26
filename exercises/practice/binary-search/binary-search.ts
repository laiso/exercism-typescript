export function find(haystack: number[], needle: number): number {
  let low = 0
  let high = haystack.length - 1

  while (low <= high) {
    const mid = Math.floor((low + high) / 2)
    const guess = haystack[mid]

    if (guess === needle) {
      return mid
    }

    if (guess > needle) {
      high = mid - 1
    } else {
      low = mid + 1
    }
  }

  throw new Error('Value not in array')
}
