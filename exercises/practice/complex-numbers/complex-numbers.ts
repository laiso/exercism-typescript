export class ComplexNumber {
  constructor(private realPart: number, private imagPart: number) {}

  get real(): number {
    return this.realPart
  }

  get imag(): number {
    return this.imagPart
  }

  add(other: ComplexNumber): ComplexNumber {
    return new ComplexNumber(this.realPart + other.realPart, this.imagPart + other.imagPart)
  }

  sub(other: ComplexNumber): ComplexNumber {
    return new ComplexNumber(this.realPart - other.realPart, this.imagPart - other.imagPart)
  }

  div(other: ComplexNumber): ComplexNumber {
    const denominator = other.realPart * other.realPart + other.imagPart * other.imagPart
    const realResult = (this.realPart * other.realPart + this.imagPart * other.imagPart) / denominator
    const imagResult = (this.imagPart * other.realPart - this.realPart * other.imagPart) / denominator
    return new ComplexNumber(realResult, imagResult)
  }

  mul(other: ComplexNumber): ComplexNumber {
    const realResult = this.realPart * other.realPart - this.imagPart * other.imagPart
    const imagResult = this.imagPart * other.realPart + this.realPart * other.imagPart
    return new ComplexNumber(realResult, imagResult)
  }

  get abs(): number {
    return Math.sqrt(this.realPart * this.realPart + this.imagPart * this.imagPart)
  }

  get conj(): ComplexNumber {
    return new ComplexNumber(this.realPart, this.imagPart === 0 ? 0 : -this.imagPart)
  }

  get exp(): ComplexNumber {
    const expReal = Math.exp(this.realPart)
    return new ComplexNumber(expReal * Math.cos(this.imagPart), expReal * Math.sin(this.imagPart))
  }
}
