//
// This is only a SKELETON file for the 'Pop Count' exercise. It's been provided as a
// convenience to get you started writing code faster.
//

export const eggCount = (displayValue: number): number => {
  let count = 0
  let value = displayValue
  
  while (value > 0) {
    // Check if the least significant bit is 1
    if (value % 2 === 1) {
      count++
    }
    // Right shift by 1 (equivalent to integer division by 2)
    value = Math.floor(value / 2)
  }
  
  return count
}
