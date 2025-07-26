export class Series {
  private series: string

  constructor(series: string) {
    this.series = series
  }

  slices(sliceLength: number): number[][] {
    if (this.series.length === 0) {
      throw new Error('series cannot be empty')
    }
    if (sliceLength > this.series.length) {
      throw new Error('slice length cannot be greater than series length')
    }
    if (sliceLength === 0) {
      throw new Error('slice length cannot be zero')
    }
    if (sliceLength < 0) {
      throw new Error('slice length cannot be negative')
    }

    const result: number[][] = []
    for (let i = 0; i <= this.series.length - sliceLength; i++) {
      const slice = this.series.slice(i, i + sliceLength)
      const numberSlice = slice.split('').map(char => parseInt(char, 10))
      result.push(numberSlice)
    }
    return result
  }
}
