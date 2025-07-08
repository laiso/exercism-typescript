export class Clock {
  private totalMinutes: number

  constructor(hour: number, minute: number = 0) {
    this.totalMinutes = ((hour * 60 + minute) % (24 * 60) + (24 * 60)) % (24 * 60)
  }

  public toString(): string {
    const hours = Math.floor(this.totalMinutes / 60)
    const minutes = this.totalMinutes % 60
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`
  }

  public plus(minutes: number): Clock {
    return new Clock(0, this.totalMinutes + minutes)
  }

  public minus(minutes: number): Clock {
    return new Clock(0, this.totalMinutes - minutes)
  }

  public equals(other: Clock): boolean {
    return this.totalMinutes === other.totalMinutes
  }
}
