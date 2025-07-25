export function flatten(arr: any[]): number[] {
  const result: number[] = [];
  
  function flattenHelper(item: any): void {
    if (Array.isArray(item)) {
      for (const element of item) {
        flattenHelper(element);
      }
    } else if (item !== undefined && item !== null) {
      result.push(item);
    }
  }
  
  flattenHelper(arr);
  return result;
}
