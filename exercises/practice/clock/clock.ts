export class Clock {
  private minutes: number

  constructor(hour: number, minute: number = 0) {
    this.minutes = this.normalizeTime(hour, minute)
  }

  public toString(): string {
    const hours = Math.floor(this.minutes / 60)
    const mins = this.minutes % 60
    return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}`
  }

  public plus(minutes: number): Clock {
    return new Clock(0, this.minutes + minutes)
  }

  public minus(minutes: number): Clock {
    return new Clock(0, this.minutes - minutes)
  }

  public equals(other: Clock): boolean {
    return this.minutes === other.minutes
  }

  private normalizeTime(hours: number, minutes: number): number {
    let totalMinutes = hours * 60 + minutes
    
    // Handle negative values
    while (totalMinutes < 0) {
      totalMinutes += 24 * 60
    }
    
    // Normalize to 24-hour cycle
    return totalMinutes % (24 * 60)
  }
}
