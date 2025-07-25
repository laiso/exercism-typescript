export class Gigasecond {
  private readonly startDate: Date

  constructor(date: Date) {
    this.startDate = new Date(date.getTime())
  }

  public date(): Date {
    const gigasecondInMs = 1000000000 * 1000 // 1 gigasecond in milliseconds
    return new Date(this.startDate.getTime() + gigasecondInMs)
  }
}
