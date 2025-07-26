const ROMAN_MAP: { [key: string]: number } = {
  M: 1000,
  CM: 900,
  D: 500,
  CD: 400,
  C: 100,
  XC: 90,
  L: 50,
  XL: 40,
  X: 10,
  IX: 9,
  V: 5,
  IV: 4,
  I: 1,
}

export const toRoman = (n: number): string => {
  let result = ''
  for (const key in ROMAN_MAP) {
    while (n >= ROMAN_MAP[key]) {
      result += key
      n -= ROMAN_MAP[key]
    }
  }
  return result
}
