export function find(haystack: number[], needle: number): number {
  let left = 0;
  let right = haystack.length - 1;
  
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    
    if (haystack[mid] === needle) {
      return mid;
    } else if (haystack[mid] < needle) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }
  
  throw new Error('Value not in array');
}
