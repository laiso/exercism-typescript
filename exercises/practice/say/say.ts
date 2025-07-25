export function sayInEnglish(number: number): string {
  if (number < 0 || number >= 1000000000000) {
    throw new Error('Number must be between 0 and 999,999,999,999')
  }
  
  if (number === 0) return 'zero'
  
  const ones = [
    '', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine',
    'ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen',
    'seventeen', 'eighteen', 'nineteen'
  ]
  
  const tens = [
    '', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'
  ]
  
  function convertHundreds(n: number): string {
    let result = ''
    
    const hundreds = Math.floor(n / 100)
    if (hundreds > 0) {
      result += ones[hundreds] + ' hundred'
    }
    
    const remainder = n % 100
    if (remainder > 0) {
      if (result) result += ' '
      
      if (remainder < 20) {
        result += ones[remainder]
      } else {
        const tensDigit = Math.floor(remainder / 10)
        const onesDigit = remainder % 10
        result += tens[tensDigit]
        if (onesDigit > 0) {
          result += '-' + ones[onesDigit]
        }
      }
    }
    
    return result
  }
  
  const parts = []
  
  const billions = Math.floor(number / 1000000000)
  if (billions > 0) {
    parts.push(convertHundreds(billions) + ' billion')
    number %= 1000000000
  }
  
  const millions = Math.floor(number / 1000000)
  if (millions > 0) {
    parts.push(convertHundreds(millions) + ' million')
    number %= 1000000
  }
  
  const thousands = Math.floor(number / 1000)
  if (thousands > 0) {
    parts.push(convertHundreds(thousands) + ' thousand')
    number %= 1000
  }
  
  if (number > 0) {
    parts.push(convertHundreds(number))
  }
  
  return parts.join(' ')
}
