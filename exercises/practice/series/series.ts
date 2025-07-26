export class Series {
  private readonly digits: number[]

  constructor(series: string) {
    if (series === '') {
      throw new Error('series cannot be empty')
    }
    this.digits = series.split('').map(Number)
  }

  slices(sliceLength: number): number[][] {
    if (sliceLength > this.digits.length) {
      throw new Error('slice length cannot be greater than series length')
    }
    if (sliceLength === 0) {
      throw new Error('slice length cannot be zero')
    }
    if (sliceLength < 0) {
      throw new Error('slice length cannot be negative')
    }

    const result: number[][] = []
    for (let i = 0; i <= this.digits.length - sliceLength; i++) {
      result.push(this.digits.slice(i, i + sliceLength))
    }
    return result
  }
}
