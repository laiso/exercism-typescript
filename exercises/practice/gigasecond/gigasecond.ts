export class Gigasecond {
  private startDate: Date

  constructor(startDate: Date) {
    this.startDate = startDate
  }

  public date(): Date {
    const gigasecond = 1000000000 * 1000 // Convert to milliseconds
    return new Date(this.startDate.getTime() + gigasecond)
  }
}
