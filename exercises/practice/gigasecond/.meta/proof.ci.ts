export function gigasecond(date: Date): Date {
  const gigasecondInMs = 1_000_000_000 * 1000
  return new Date(date.getTime() + gigasecondInMs)
}