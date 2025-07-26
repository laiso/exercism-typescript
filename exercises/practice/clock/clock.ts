export class Clock {
  private minutes: number

  constructor(hour: number, minute: number = 0) {
    // Convert to total minutes and normalize to 24-hour format
    this.minutes = this.normalizeTime(hour * 60 + minute)
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

  private normalizeTime(totalMinutes: number): number {
    // Handle negative minutes by adding multiples of 24 hours
    while (totalMinutes < 0) {
      totalMinutes += 24 * 60
    }
    
    // Normalize to 24-hour format
    return totalMinutes % (24 * 60)
  }
}
