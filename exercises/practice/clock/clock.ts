export class Clock {
  private hours: number
  private minutes: number

  constructor(hour: number, minute: number = 0) {
    // Convert everything to minutes, normalize, then convert back
    const totalMinutes = hour * 60 + minute
    const normalizedMinutes = this.normalizeMinutes(totalMinutes)
    
    this.hours = Math.floor(normalizedMinutes / 60) % 24
    this.minutes = normalizedMinutes % 60
  }

  private normalizeMinutes(minutes: number): number {
    // Handle negative values by adding enough days to make it positive
    const minutesInDay = 24 * 60
    return ((minutes % minutesInDay) + minutesInDay) % minutesInDay
  }

  public toString(): string {
    const paddedHours = this.hours.toString().padStart(2, '0')
    const paddedMinutes = this.minutes.toString().padStart(2, '0')
    return `${paddedHours}:${paddedMinutes}`
  }

  public plus(minutes: number): Clock {
    const newTotalMinutes = this.hours * 60 + this.minutes + minutes
    const normalizedMinutes = this.normalizeMinutes(newTotalMinutes)
    
    const newHours = Math.floor(normalizedMinutes / 60) % 24
    const newMinutes = normalizedMinutes % 60
    
    return new Clock(newHours, newMinutes)
  }

  public minus(minutes: number): Clock {
    return this.plus(-minutes)
  }

  public equals(other: Clock): boolean {
    return this.hours === other.hours && this.minutes === other.minutes
  }
}
