export class Series {
  private series: string

  constructor(series: string) {
    this.series = series
  }

  slices(sliceLength: number): number[][] {
    if (sliceLength > this.series.length) {
      throw new Error('slice length cannot be greater than series length')
    }
    
    if (sliceLength <= 0) {
      throw new Error('slice length cannot be zero or negative')
    }
    
    const result: number[][] = []
    
    for (let i = 0; i <= this.series.length - sliceLength; i++) {
      const slice = this.series.substr(i, sliceLength)
        .split('')
        .map(digit => parseInt(digit, 10))
      result.push(slice)
    }
    
    return result
  }
}
