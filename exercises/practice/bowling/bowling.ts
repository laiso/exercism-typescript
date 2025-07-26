export class Bowling {
  private rolls: number[] = []
  private currentRoll = 0
  private gameComplete = false

  public roll(pins: number): void {
    if (this.gameComplete) {
      throw new Error('Cannot roll after game is over')
    }
    
    if (pins < 0) {
      throw new Error('Negative roll is invalid')
    }
    
    if (pins > 10) {
      throw new Error('Pin count exceeds pins on the lane')
    }
    
    if (this.currentRoll > 0 && !this.isInTenthFrame()) {
      const frameStartIndex = this.getFrameStartIndex()
      if (frameStartIndex >= 0 && this.rolls[frameStartIndex] !== 10) {
        if (this.rolls[frameStartIndex] + pins > 10) {
          throw new Error('Pin count exceeds pins on the lane')
        }
      }
    }
    
    if (this.isInTenthFrame()) {
      this.validateTenthFrameRoll(pins)
    }
    
    this.rolls[this.currentRoll++] = pins
    
    if (this.isGameComplete()) {
      this.gameComplete = true
    }
  }

  public score(): number {
    if (!this.gameComplete) {
      throw new Error('Score cannot be taken until the end of the game')
    }
    
    let score = 0
    let rollIndex = 0

    for (let frame = 0; frame < 10; frame++) {
      if (this.isStrike(rollIndex)) {
        score += 10 + this.strikeBonus(rollIndex)
        rollIndex++
      } else if (this.isSpare(rollIndex)) {
        score += 10 + this.spareBonus(rollIndex)
        rollIndex += 2
      } else {
        score += this.sumOfBallsInFrame(rollIndex)
        rollIndex += 2
      }
    }

    return score
  }

  private isInTenthFrame(): boolean {
    let frame = 0
    let rollIndex = 0
    
    while (frame < 9 && rollIndex < this.currentRoll) {
      if (this.rolls[rollIndex] === 10) {
        rollIndex++
      } else {
        rollIndex += 2
      }
      frame++
    }
    
    return frame >= 9
  }
  
  private getFrameStartIndex(): number {
    let frame = 0
    let rollIndex = 0
    
    while (frame < 9 && rollIndex < this.currentRoll - 1) {
      if (this.rolls[rollIndex] === 10) {
        rollIndex++
      } else {
        rollIndex += 2
      }
      frame++
    }
    
    if (frame < 9) {
      return rollIndex
    }
    return -1
  }
  
  private validateTenthFrameRoll(pins: number): void {
    const tenthFrameStart = this.getTenthFrameStartIndex()
    const rollsInTenthFrame = this.currentRoll - tenthFrameStart
    
    if (rollsInTenthFrame === 1) {
      const firstRoll = this.rolls[tenthFrameStart]
      if (firstRoll !== 10 && firstRoll + pins > 10) {
        throw new Error('Pin count exceeds pins on the lane')
      }
    } else if (rollsInTenthFrame === 2) {
      const firstRoll = this.rolls[tenthFrameStart]
      const secondRoll = this.rolls[tenthFrameStart + 1]
      
      if (firstRoll === 10) {
        if (secondRoll !== 10 && secondRoll + pins > 10) {
          throw new Error('Pin count exceeds pins on the lane')
        }
        if (secondRoll !== 10 && pins === 10) {
          throw new Error('Pin count exceeds pins on the lane')
        }
      } else {
      }
    }
  }
  
  private getTenthFrameStartIndex(): number {
    let frame = 0
    let rollIndex = 0
    
    while (frame < 9) {
      if (this.rolls[rollIndex] === 10) {
        rollIndex++
      } else {
        rollIndex += 2
      }
      frame++
    }
    
    return rollIndex
  }
  
  private isGameComplete(): boolean {
    let frame = 0
    let rollIndex = 0
    
    while (frame < 9 && rollIndex < this.currentRoll) {
      if (this.rolls[rollIndex] === 10) {
        rollIndex++
      } else {
        rollIndex += 2
      }
      frame++
    }
    
    if (frame < 9) return false
    
    const tenthFrameStart = rollIndex
    const rollsInTenthFrame = this.currentRoll - tenthFrameStart
    
    if (rollsInTenthFrame === 0) return false
    
    const firstRoll = this.rolls[tenthFrameStart]
    
    if (firstRoll === 10) {
      return rollsInTenthFrame >= 3
    } else if (rollsInTenthFrame >= 2) {
      const secondRoll = this.rolls[tenthFrameStart + 1]
      if (firstRoll + secondRoll === 10) {
        return rollsInTenthFrame >= 3
      } else {
        return rollsInTenthFrame >= 2
      }
    }
    
    return false
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

  private sumOfBallsInFrame(rollIndex: number): number {
    return this.rolls[rollIndex] + this.rolls[rollIndex + 1]
  }
}
