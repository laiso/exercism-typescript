export class Series {
  private digits: number[]

  constructor(series: string) {
    if (series.length === 0) {
      throw new Error('series cannot be empty')
    }
    this.digits = series.split('').map(char => parseInt(char, 10))
  }

  slices(sliceLength: number): number[][] {
    if (sliceLength < 0) {
      throw new Error('slice length cannot be negative')
    }
    if (sliceLength === 0) {
      throw new Error('slice length cannot be zero')
    }
    if (sliceLength > this.digits.length) {
      throw new Error('slice length cannot be greater than series length')
    }
    
    const result: number[][] = []
    for (let i = 0; i <= this.digits.length - sliceLength; i++) {
      result.push(this.digits.slice(i, i + sliceLength))
    }
    return result
  }
}
