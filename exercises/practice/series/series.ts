export class Series {
  private series: string

  constructor(series: unknown) {
    this.series = String(series)
    if (this.series === '') {
      throw new Error('series cannot be empty')
    }
  }

  slices(sliceLength: unknown): number[][] {
    const length = Number(sliceLength)
    
    if (length < 0) {
      throw new Error('slice length cannot be negative')
    }
    
    if (length === 0) {
      throw new Error('slice length cannot be zero')
    }
    
    if (length > this.series.length) {
      throw new Error('slice length cannot be greater than series length')
    }
    
    const result: number[][] = []
    
    for (let i = 0; i <= this.series.length - length; i++) {
      const slice = this.series.slice(i, i + length)
      const numbers = slice.split('').map(char => parseInt(char))
      result.push(numbers)
    }
    
    return result
  }
}
