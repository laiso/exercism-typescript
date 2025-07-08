export class Gigasecond {
  private birthDate: Date
  
  constructor(birthDate: Date) {
    this.birthDate = new Date(birthDate.getTime())
  }
  
  public date(): Date {
    const gigasecondInMs = 1_000_000_000 * 1000
    return new Date(this.birthDate.getTime() + gigasecondInMs)
  }
}
