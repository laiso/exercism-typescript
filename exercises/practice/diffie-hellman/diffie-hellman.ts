export class DiffieHellman {
  private p: number
  private g: number

  constructor(p: number, g: number) {
    if (p < 2 || g < 2) {
      throw new Error('p and g must be at least 2')
    }
    if (!this.isPrime(p)) {
      throw new Error('p must be prime')
    }
    if (g >= p) {
      throw new Error('g must be less than p')
    }
    this.p = p
    this.g = g
  }

  public getPublicKey(privateKey: number): number {
    if (privateKey < 2 || privateKey >= this.p) {
      throw new Error('Private key must be greater than 1 and less than p')
    }
    return this.modPow(this.g, privateKey, this.p)
  }

  public getSecret(theirPublicKey: number, myPrivateKey: number): number {
    return this.modPow(theirPublicKey, myPrivateKey, this.p)
  }

  private isPrime(n: number): boolean {
    if (n < 2) return false
    if (n === 2) return true
    if (n % 2 === 0) return false
    
    for (let i = 3; i * i <= n; i += 2) {
      if (n % i === 0) return false
    }
    return true
  }

  private modPow(base: number, exponent: number, modulus: number): number {
    let result = 1
    base = base % modulus
    
    while (exponent > 0) {
      if (exponent % 2 === 1) {
        result = (result * base) % modulus
      }
      exponent = Math.floor(exponent / 2)
      base = (base * base) % modulus
    }
    
    return result
  }
}
