export function convert(input: string): string {
  const lines = input.split('\n')
  
  if (lines.length % 4 !== 0) {
    throw new Error('Number of input lines is not a multiple of four')
  }
  
  const digitHeight = 4
  const digitWidth = 3
  const numRows = lines.length / digitHeight
  
  if (lines.some(line => line.length % digitWidth !== 0)) {
    throw new Error('Number of input columns is not a multiple of three')
  }
  
  const digitPatterns: { [key: string]: string } = {
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
  
  let result = ''
  
  for (let row = 0; row < numRows; row++) {
    const startLine = row * digitHeight
    const rowLines = lines.slice(startLine, startLine + digitHeight)
    const numDigits = rowLines[0].length / digitWidth
    
    for (let digit = 0; digit < numDigits; digit++) {
      const startCol = digit * digitWidth
      let digitPattern = ''
      
      for (let line = 0; line < digitHeight; line++) {
        digitPattern += rowLines[line].substring(startCol, startCol + digitWidth)
      }
      
      const recognizedDigit = digitPatterns[digitPattern]
      result += recognizedDigit || '?'
    }
    
    if (row < numRows - 1) {
      result += ','
    }
  }
  
  return result
}
