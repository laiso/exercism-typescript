export function age(planet: string, seconds: number): number {
  const earthYearInSeconds = 31557600
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
  
  const earthAge = seconds / earthYearInSeconds
  const planetAge = earthAge / orbitalPeriods[planet]
  return Math.round(planetAge * 100) / 100
}
