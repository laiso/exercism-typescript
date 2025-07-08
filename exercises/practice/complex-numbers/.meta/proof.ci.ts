export class ComplexNumber {
  private _real: number
  private _imag: number

  constructor(real: number, imaginary: number) {
    this._real = real
    this._imag = imaginary
  }

  public get real(): number {
    return this._real
  }

  public get imag(): number {
    return this._imag
  }

  public add(other: ComplexNumber): ComplexNumber {
    return new ComplexNumber(this._real + other._real, this._imag + other._imag)
  }

  public sub(other: ComplexNumber): ComplexNumber {
    return new ComplexNumber(this._real - other._real, this._imag - other._imag)
  }

  public div(other: ComplexNumber): ComplexNumber {
    const denominator = other._real * other._real + other._imag * other._imag
    const realPart = (this._real * other._real + this._imag * other._imag) / denominator
    const imagPart = (this._imag * other._real - this._real * other._imag) / denominator
    return new ComplexNumber(realPart, imagPart)
  }

  public mul(other: ComplexNumber): ComplexNumber {
    const realPart = this._real * other._real - this._imag * other._imag
    const imagPart = this._imag * other._real + this._real * other._imag
    return new ComplexNumber(realPart, imagPart)
  }

  public get abs(): number {
    return Math.sqrt(this._real * this._real + this._imag * this._imag)
  }

  public get conj(): ComplexNumber {
    return new ComplexNumber(this._real, -this._imag)
  }

  public get exp(): ComplexNumber {
    const expReal = Math.exp(this._real)
    return new ComplexNumber(expReal * Math.cos(this._imag), expReal * Math.sin(this._imag))
  }
}
