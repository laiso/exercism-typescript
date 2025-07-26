export class Gigasecond {
  private birthDate: Date

  constructor(birthDate: Date) {
    this.birthDate = birthDate
  }

  public date(): Date {
    const gigasecond = 1000000000 * 1000 // 1 billion seconds in milliseconds
    return new Date(this.birthDate.getTime() + gigasecond)
  }
}
