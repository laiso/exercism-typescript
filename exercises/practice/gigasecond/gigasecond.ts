export class Gigasecond {
  private readonly startDate: Date

  constructor(startDate: Date) {
    this.startDate = new Date(startDate.getTime())
  }

  public date(): Date {
    const gigasecondInMs = 1_000_000_000 * 1000
    return new Date(this.startDate.getTime() + gigasecondInMs)
  }
}
