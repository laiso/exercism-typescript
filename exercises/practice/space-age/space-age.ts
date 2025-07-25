export function age(planet: string, seconds: number): number {
  const EARTH_YEAR_SECONDS = 31557600 // 365.25 days * 24 hours * 60 minutes * 60 seconds
  
  const orbitalPeriods: { [key: string]: number } = {
    mercury: 0.2408467,
    venus: 0.61519726,
    earth: 1.0,
    mars: 1.8808158,
    jupiter: 11.862615,
    saturn: 29.447498,
    uranus: 84.016846,
    neptune: 164.79132
  }
  
  const earthAge = seconds / EARTH_YEAR_SECONDS
  const planetAge = earthAge / orbitalPeriods[planet]
  
  return Math.round(planetAge * 100) / 100 // Round to 2 decimal places
}
