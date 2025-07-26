export class Bowling {
  private rolls: number[] = []
  private currentRoll = 0

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

    // Check for invalid frame totals (not in 10th frame)
    if (!this.isLastFrame()) {
      const currentFrame = this.getCurrentFrame()
      const frameStart = this.getFrameStart(currentFrame)
      const rollsInCurrentFrame = this.currentRoll - frameStart
      
      if (rollsInCurrentFrame === 1 && frameStart !== -1) {
        // Second roll in a frame
        if (this.rolls[frameStart] + pins > 10 && this.rolls[frameStart] !== 10) {
          throw new Error('Pin count exceeds pins on the lane')
        }
      }
    }

    // Special validation for 10th frame
    if (this.isLastFrame()) {
      this.validateLastFrameRoll(pins)
    }

    this.rolls[this.currentRoll] = pins
    this.currentRoll++
  }

  public score(): number {
    if (!this.isGameComplete()) {
      throw new Error('Score cannot be taken until the end of the game')
    }

    let totalScore = 0
    let rollIndex = 0

    for (let frame = 0; frame < 10; frame++) {
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

  private isGameComplete(): boolean {
    if (this.currentRoll < 18) return false

    // Need at least 18 rolls for first 9 frames
    let rollIndex = 0
    for (let frame = 0; frame < 9; frame++) {
      if (this.isStrike(rollIndex)) {
        rollIndex += 1
      } else {
        rollIndex += 2
      }
    }

    // Check 10th frame completion
    if (this.isStrike(rollIndex)) {
      return this.currentRoll >= rollIndex + 3
    } else if (this.isSpare(rollIndex)) {
      return this.currentRoll >= rollIndex + 3
    } else {
      return this.currentRoll >= rollIndex + 2
    }
  }

  private isLastFrame(): boolean {
    let rollIndex = 0
    for (let frame = 0; frame < 9; frame++) {
      if (rollIndex >= this.currentRoll) return false
      if (this.isStrike(rollIndex)) {
        rollIndex += 1
      } else {
        rollIndex += 2
      }
    }
    return rollIndex <= this.currentRoll
  }

  private getCurrentFrame(): number {
    let rollIndex = 0
    for (let frame = 0; frame < 10; frame++) {
      if (rollIndex >= this.currentRoll) return frame
      if (frame < 9) {
        if (this.isStrike(rollIndex)) {
          rollIndex += 1
        } else {
          rollIndex += 2
        }
      } else {
        // 10th frame
        break
      }
    }
    return 9
  }

  private getFrameStart(frame: number): number {
    let rollIndex = 0
    for (let f = 0; f < frame; f++) {
      if (this.isStrike(rollIndex)) {
        rollIndex += 1
      } else {
        rollIndex += 2
      }
    }
    return rollIndex < this.currentRoll ? rollIndex : -1
  }

  private validateLastFrameRoll(pins: number): void {
    let rollIndex = 0
    for (let frame = 0; frame < 9; frame++) {
      if (this.isStrike(rollIndex)) {
        rollIndex += 1
      } else {
        rollIndex += 2
      }
    }

    const rollsInLastFrame = this.currentRoll - rollIndex
    
    if (rollsInLastFrame === 0) {
      // First roll of 10th frame - no special validation needed
      return
    } else if (rollsInLastFrame === 1) {
      // Second roll of 10th frame
      if (this.rolls[rollIndex] !== 10 && this.rolls[rollIndex] + pins > 10) {
        throw new Error('Pin count exceeds pins on the lane')
      }
    } else if (rollsInLastFrame === 2) {
      // Third roll of 10th frame (bonus roll)
      const firstRoll = this.rolls[rollIndex]
      const secondRoll = this.rolls[rollIndex + 1]
      
      if (firstRoll === 10) {
        // First was strike, second roll can be anything
        if (secondRoll !== 10 && secondRoll + pins > 10) {
          throw new Error('Pin count exceeds pins on the lane')
        }
      } else if (firstRoll + secondRoll === 10) {
        // Spare in 10th frame, third roll can be anything up to 10
        // No additional validation needed
      } else {
        // Should not reach here if game logic is correct
        throw new Error('Cannot roll after game is over')
      }
    }
  }
}
