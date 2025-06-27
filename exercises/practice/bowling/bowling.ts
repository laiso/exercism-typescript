export class Bowling {
  private rolls: number[] = []

  public roll(pins: number): void {
    if (pins < 0) {
      throw new Error('Negative roll is invalid')
    }
    if (pins > 10) {
      throw new Error('Pin count exceeds pins on the lane')
    }
    
    if (this.isGameComplete()) {
      throw new Error('Cannot roll after game is over')
    }

    this.validateRoll(pins)
    this.rolls.push(pins)
  }

  public score(): number {
    if (!this.isGameComplete()) {
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
        score += this.sumOfRollsInFrame(rollIndex)
        rollIndex += 2
      }
    }

    return score
  }

  private validateRoll(pins: number): void {
    if (this.rolls.length < 18) {
      // Frames 1-9
      let frameRollCount = 0
      let frameSum = 0
      
      for (let i = this.rolls.length - 1; i >= 0; i--) {
        if (this.rolls[i] === 10) {
          break // Previous frame if strike
        }
        frameRollCount++
        frameSum += this.rolls[i]
        if (frameRollCount === 2) {
          break // 2 rolls per frame
        }
      }
      
      if (frameRollCount === 1 && frameSum + pins > 10) {
        throw new Error('Pin count exceeds pins on the lane')
      }
    } else if (this.rolls.length === 18) {
      // 1st roll of 10th frame, no restriction
    } else if (this.rolls.length === 19) {
      const firstTenthFrame = this.rolls[18]
      if (firstTenthFrame !== 10 && firstTenthFrame + pins > 10) {
        throw new Error('Pin count exceeds pins on the lane')
      }
    } else if (this.rolls.length === 20) {
      const firstTenthFrame = this.rolls[18]
      const secondTenthFrame = this.rolls[19]
      
      if (firstTenthFrame === 10) {
        if (secondTenthFrame !== 10 && secondTenthFrame + pins > 10) {
          throw new Error('Pin count exceeds pins on the lane')
        }
      } else if (firstTenthFrame + secondTenthFrame === 10) {
        // If spare, no restriction on 3rd roll
      } else {
        throw new Error('Pin count exceeds pins on the lane')
      }
    }
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

  private sumOfRollsInFrame(rollIndex: number): number {
    return this.rolls[rollIndex] + this.rolls[rollIndex + 1]
  }

  private isGameComplete(): boolean {
    const frameCount = this.countFrames()
    
    if (frameCount < 10) return false
    
    if (frameCount === 10) {
      const tenthFrameStart = this.getTenthFrameStartIndex()
      const tenthFrameRolls = this.rolls.slice(tenthFrameStart)
      
      if (tenthFrameRolls.length === 0) return false
      
      if (tenthFrameRolls[0] === 10) {
        // If strike in 10th frame, need 3 rolls
        return tenthFrameRolls.length >= 3
      } else if (tenthFrameRolls.length >= 2 && tenthFrameRolls[0] + tenthFrameRolls[1] === 10) {
        // If spare in 10th frame, need 3 rolls
        return tenthFrameRolls.length >= 3
      } else {
        // Otherwise, game ends after 2 rolls in 10th frame
        return tenthFrameRolls.length >= 2
      }
    }
    
    return false
  }

  private countFrames(): number {
    let frames = 0
    let rollIndex = 0
    
    while (rollIndex < this.rolls.length && frames < 9) {
      if (this.rolls[rollIndex] === 10) {
        frames++
        rollIndex++
      } else {
        frames++
        rollIndex += 2
      }
    }
    
    if (rollIndex < this.rolls.length) {
      frames++
    }
    
    return frames
  }

  private getTenthFrameStartIndex(): number {
    let frames = 0
    let rollIndex = 0
    
    while (frames < 9 && rollIndex < this.rolls.length) {
      if (this.rolls[rollIndex] === 10) {
        frames++
        rollIndex++
      } else {
        frames++
        rollIndex += 2
      }
    }
    
    return rollIndex
  }
}
