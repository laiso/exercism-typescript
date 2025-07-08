export function sayInEnglish(n: number): string {
  if (n < 0 || n >= 1000000000000) {
    throw new Error('Number must be between 0 and 999,999,999,999.')
  }

  if (n === 0) return 'zero'

  const ones = ['', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine']
  const teens = ['ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen']
  const tens = ['', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety']
  const scales = ['', 'thousand', 'million', 'billion']

  function convertHundreds(num: number): string {
    let result = ''
    
    if (num >= 100) {
      result += ones[Math.floor(num / 100)] + ' hundred'
      num %= 100
      if (num > 0) result += ' '
    }
    
    if (num >= 20) {
      result += tens[Math.floor(num / 10)]
      num %= 10
      if (num > 0) result += '-' + ones[num]
    } else if (num >= 10) {
      result += teens[num - 10]
    } else if (num > 0) {
      result += ones[num]
    }
    
    return result
  }

  const parts: string[] = []
  let scaleIndex = 0
  
  while (n > 0) {
    const chunk = n % 1000
    if (chunk > 0) {
      let chunkStr = convertHundreds(chunk)
      if (scaleIndex > 0) {
        chunkStr += ' ' + scales[scaleIndex]
      }
      parts.unshift(chunkStr)
    }
    n = Math.floor(n / 1000)
    scaleIndex++
  }
  
  return parts.join(' ')
}
