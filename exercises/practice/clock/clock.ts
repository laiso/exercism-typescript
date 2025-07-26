export class Clock {
  private hours: number
  private minutes: number

  constructor(hour: number, minute: number = 0) {
    const totalMinutes = hour * 60 + minute
    const normalizedMinutes = ((totalMinutes % (24 * 60)) + (24 * 60)) % (24 * 60)
    
    this.hours = Math.floor(normalizedMinutes / 60)
    this.minutes = normalizedMinutes % 60
  }

  public toString(): string {
    const hourStr = this.hours.toString().padStart(2, '0')
    const minuteStr = this.minutes.toString().padStart(2, '0')
    return `${hourStr}:${minuteStr}`
  }

  public plus(minutes: number): Clock {
    return new Clock(this.hours, this.minutes + minutes)
  }

  public minus(minutes: number): Clock {
    return new Clock(this.hours, this.minutes - minutes)
  }

  public equals(other: Clock): boolean {
    return this.hours === other.hours && this.minutes === other.minutes
  }
}
