export class ComplexNumber {
  private _real: number
  private _imag: number

  constructor(real: number, imag: number = 0) {
    this._real = real
    this._imag = imag
  }

  public get real(): number {
    return this._real
  }

  public get imag(): number {
    return this._imag
  }

  public add(other: ComplexNumber): ComplexNumber {
    return new ComplexNumber(this._real + other.real, this._imag + other.imag)
  }

  public sub(other: ComplexNumber): ComplexNumber {
    return new ComplexNumber(this._real - other.real, this._imag - other.imag)
  }

  public mul(other: ComplexNumber): ComplexNumber {
    const realPart = this._real * other.real - this._imag * other.imag
    const imagPart = this._imag * other.real + this._real * other.imag
    return new ComplexNumber(realPart, imagPart)
  }

  public div(other: ComplexNumber): ComplexNumber {
    const denominator = other.real * other.real + other.imag * other.imag
    const realPart = (this._real * other.real + this._imag * other.imag) / denominator
    const imagPart = (this._imag * other.real - this._real * other.imag) / denominator
    return new ComplexNumber(realPart, imagPart)
  }

  public get abs(): number {
    return Math.sqrt(this._real * this._real + this._imag * this._imag)
  }

  public get conj(): ComplexNumber {
    return new ComplexNumber(this._real, this._imag === 0 ? 0 : -this._imag)
  }

  public get exp(): ComplexNumber {
    const realPart = Math.exp(this._real) * Math.cos(this._imag)
    const imagPart = Math.exp(this._real) * Math.sin(this._imag)
    return new ComplexNumber(realPart, imagPart)
  }
}
