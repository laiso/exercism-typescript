export class Gigasecond {
  private birthDate: Date

  constructor(birthDate: Date) {
    this.birthDate = birthDate
  }

  public date(): Date {
    const gigasecondInMs = 1000000000 * 1000
    return new Date(this.birthDate.getTime() + gigasecondInMs)
  }
}
