export class Bowling {
  private rolls: number[] = []

  public roll(pins: number): void {
    if (pins < 0) {
      throw new Error('Negative roll is invalid')
    }
    if (pins > 10) {
      throw new Error('Pin count exceeds pins on the lane')
    }

    if (this.isGameOver()) {
      throw new Error('Cannot roll after game is over')
    }

    this.validateRoll(pins)
    this.rolls.push(pins)
  }

  public score(): number {
    if (!this.isGameComplete()) {
      throw new Error('Score cannot be taken until the end of the game')
    }

    let totalScore = 0
    let rollIndex = 0

    for (let frame = 0; frame < 10; frame++) {
      if (frame === 9) {
        totalScore += this.scoreLastFrame()
        break
      }

      if (this.isStrike(rollIndex)) {
        totalScore += 10 + this.strikeBonus(rollIndex)
        rollIndex += 1
      } else if (this.isSpare(rollIndex)) {
        totalScore += 10 + this.spareBonus(rollIndex)
        rollIndex += 2
      } else {
        totalScore += this.rolls[rollIndex] + this.rolls[rollIndex + 1]
        rollIndex += 2
      }
    }

    return totalScore
  }

  private validateRoll(pins: number): void {
    const rollCount = this.rolls.length
    
    if (rollCount < 18) {
      this.validateNormalRoll(pins, rollCount)
    } else {
      this.validateTenthFrameRoll(pins, rollCount)
    }
  }

  private validateNormalRoll(pins: number, rollCount: number): void {
    const frameIndex = Math.floor(rollCount / 2)
    const isSecondRoll = rollCount % 2 === 1
    
    if (isSecondRoll) {
      const firstRoll = this.rolls[rollCount - 1]
      if (firstRoll + pins > 10) {
        throw new Error('Pin count exceeds pins on the lane')
      }
    }
  }

  private validateTenthFrameRoll(pins: number, rollCount: number): void {
    const tenthFrameRolls = this.rolls.slice(18)
    
    if (tenthFrameRolls.length === 1) {
      const firstRoll = tenthFrameRolls[0]
      if (firstRoll < 10 && firstRoll + pins > 10) {
        throw new Error('Pin count exceeds pins on the lane')
      }
    } else if (tenthFrameRolls.length === 2) {
      const [firstRoll, secondRoll] = tenthFrameRolls
      if (firstRoll < 10 && secondRoll < 10 && secondRoll + pins > 10) {
        throw new Error('Pin count exceeds pins on the lane')
      }
    }
  }

  private isGameOver(): boolean {
    if (this.rolls.length < 20) {
      return false
    }

    const tenthFrameRolls = this.rolls.slice(18)
    
    if (tenthFrameRolls.length < 2) return false
    
    const [firstRoll, secondRoll] = tenthFrameRolls
    
    if (firstRoll === 10) {
      return tenthFrameRolls.length >= 3
    }
    
    if (firstRoll + secondRoll === 10) {
      return tenthFrameRolls.length >= 3
    }
    
    return tenthFrameRolls.length >= 2
  }

  private isGameComplete(): boolean {
    if (this.rolls.length < 20) {
      return false
    }

    const tenthFrameRolls = this.rolls.slice(18)
    
    if (tenthFrameRolls.length < 2) return false
    
    const [firstRoll, secondRoll] = tenthFrameRolls
    
    if (firstRoll === 10) {
      return tenthFrameRolls.length >= 3
    }
    
    if (firstRoll + secondRoll === 10) {
      return tenthFrameRolls.length >= 3
    }
    
    return true
  }

  private isStrike(rollIndex: number): boolean {
    return this.rolls[rollIndex] === 10
  }

  private isSpare(rollIndex: number): boolean {
    return this.rolls[rollIndex] + this.rolls[rollIndex + 1] === 10
  }

  private strikeBonus(rollIndex: number): number {
    return this.rolls[rollIndex + 1] + this.rolls[rollIndex + 2]
  }

  private spareBonus(rollIndex: number): number {
    return this.rolls[rollIndex + 2]
  }

  private scoreLastFrame(): number {
    const tenthFrameRolls = this.rolls.slice(18)
    return tenthFrameRolls.reduce((sum, roll) => sum + roll, 0)
  }
}
