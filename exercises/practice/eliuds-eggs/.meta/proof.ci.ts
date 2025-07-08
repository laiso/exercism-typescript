//
// This is only a SKELETON file for the 'Pop Count' exercise. It's been provided as a
// convenience to get you started writing code faster.
//

export const eggCount = (displayValue: number): number => {
  let count = 0
  let num = displayValue
  
  while (num > 0) {
    count += num & 1
    num >>>= 1
  }
  
  return count
}
