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
    this.p = p
    this.g = g
  }

  public getPublicKey(privateKey: number): number {
    if (privateKey < 2 || privateKey >= this.p) {
      throw new Error('privateKey must be between 2 and p-1')
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

  private modPow(base: number, exp: number, mod: number): number {
    let result = 1
    base = base % mod
    while (exp > 0) {
      if (exp % 2 === 1) {
        result = (result * base) % mod
      }
      exp = Math.floor(exp / 2)
      base = (base * base) % mod
    }
    return result
  }
}
