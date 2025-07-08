export class Rational {
  private numerator: number
  private denominator: number

  constructor(numerator: number, denominator: number) {
    if (denominator === 0) {
      throw new Error('Denominator cannot be zero')
    }
    const gcd = this.gcd(Math.abs(numerator), Math.abs(denominator))
    this.numerator = numerator / gcd
    this.denominator = denominator / gcd
    
    if (this.denominator < 0) {
      this.numerator = -this.numerator
      this.denominator = -this.denominator
    }
  }

  add(other: Rational): Rational {
    const num = this.numerator * other.denominator + other.numerator * this.denominator
    const den = this.denominator * other.denominator
    return new Rational(num, den)
  }

  sub(other: Rational): Rational {
    const num = this.numerator * other.denominator - other.numerator * this.denominator
    const den = this.denominator * other.denominator
    return new Rational(num, den)
  }

  mul(other: Rational): Rational {
    return new Rational(this.numerator * other.numerator, this.denominator * other.denominator)
  }

  div(other: Rational): Rational {
    return new Rational(this.numerator * other.denominator, this.denominator * other.numerator)
  }

  abs(): Rational {
    return new Rational(Math.abs(this.numerator), this.denominator)
  }

  exprational(n: number): Rational {
    if (n === 0) return new Rational(1, 1)
    if (n > 0) {
      return new Rational(Math.pow(this.numerator, n), Math.pow(this.denominator, n))
    } else {
      return new Rational(Math.pow(this.denominator, -n), Math.pow(this.numerator, -n))
    }
  }

  expreal(x: number): number {
    return Math.pow(x, this.numerator / this.denominator)
  }

  reduce(): Rational {
    return new Rational(this.numerator, this.denominator)
  }

  private gcd(a: number, b: number): number {
    return b === 0 ? a : this.gcd(b, a % b)
  }
}
