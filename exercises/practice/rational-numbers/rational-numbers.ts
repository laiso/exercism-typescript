export class Rational {
  public numerator: number
  public denominator: number

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

  private gcd(a: number, b: number): number {
    return b === 0 ? a : this.gcd(b, a % b)
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
    const num = this.numerator * other.numerator
    const den = this.denominator * other.denominator
    return new Rational(num, den)
  }

  div(other: Rational): Rational {
    const num = this.numerator * other.denominator
    const den = this.denominator * other.numerator
    return new Rational(num, den)
  }

  abs(): Rational {
    return new Rational(Math.abs(this.numerator), this.denominator)
  }

  exprational(exponent: number): Rational {
    if (exponent >= 0) {
      return new Rational(Math.pow(this.numerator, exponent), Math.pow(this.denominator, exponent))
    } else {
      return new Rational(Math.pow(this.denominator, -exponent), Math.pow(this.numerator, -exponent))
    }
  }

  expreal(base: number): number {
    return Math.pow(base, this.numerator / this.denominator)
  }

  reduce(): Rational {
    return new Rational(this.numerator, this.denominator)
  }
}
