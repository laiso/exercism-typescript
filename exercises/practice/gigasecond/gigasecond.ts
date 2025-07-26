export class Gigasecond {
  private readonly startDate: Date

  constructor(startDate: Date) {
    this.startDate = new Date(startDate)
  }

  public date(): Date {
    const gigasecond = 1000000000 * 1000 // Convert to milliseconds
    return new Date(this.startDate.getTime() + gigasecond)
  }
}
