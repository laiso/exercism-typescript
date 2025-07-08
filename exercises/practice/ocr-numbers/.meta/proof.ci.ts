export function convert(input: string): string {
  const lines = input.split('\n')
  if (lines.length % 4 !== 0) {
    throw new Error('Number of input lines is not a multiple of four')
  }
  
  const digits: { [key: string]: string } = {
    ' _ | ||_|   ': '0',
    '     |  |   ': '1',
    ' _  _||_    ': '2',
    ' _  _| _|   ': '3',
    '   |_|  |   ': '4',
    ' _ |_  _|   ': '5',
    ' _ |_ |_|   ': '6',
    ' _   |  |   ': '7',
    ' _ |_||_|   ': '8',
    ' _ |_| _|   ': '9'
  }
  
  const results: string[] = []
  
  for (let row = 0; row < lines.length; row += 4) {
    const rowLines = lines.slice(row, row + 4)
    if (rowLines[0].length % 3 !== 0) {
      throw new Error('Number of input columns is not a multiple of three')
    }
    
    let rowResult = ''
    for (let col = 0; col < rowLines[0].length; col += 3) {
      let digitPattern = ''
      for (let line = 0; line < 4; line++) {
        digitPattern += (rowLines[line] || '').substring(col, col + 3)
      }
      
      const digit = digits[digitPattern]
      rowResult += digit || '?'
    }
    results.push(rowResult)
  }
  
  return results.join(',')
}
