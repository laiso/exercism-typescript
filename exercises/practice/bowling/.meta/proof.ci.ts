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
    
    const frameNumber = this.getFrameNumber()
    const frameStart = this.getFrameStart()
    const rollsInCurrentFrame = this.currentRoll - frameStart
    
    if (frameNumber < 9) {
      if (rollsInCurrentFrame === 1 && !this.isStrike(frameStart)) {
        if (this.rolls[frameStart] + pins > 10) {
          throw new Error('Pin count exceeds pins on the lane')
        }
      }
    } else if (frameNumber === 9) {
      if (rollsInCurrentFrame === 1) {
        if (!this.isStrike(frameStart) && this.rolls[frameStart] + pins > 10) {
          throw new Error('Pin count exceeds pins on the lane')
        }
      } else if (rollsInCurrentFrame === 2) {
        if (this.isStrike(frameStart) && !this.isStrike(frameStart + 1) && this.rolls[frameStart + 1] + pins > 10) {
          throw new Error('Pin count exceeds pins on the lane')
        }
      }
    }
    
    this.rolls[this.currentRoll++] = pins
    this.checkGameComplete()
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

  private getFrameNumber(): number {
    let frame = 0
    let rollIndex = 0
    
    while (rollIndex < this.currentRoll && frame < 9) {
      if (this.isStrike(rollIndex)) {
        rollIndex++
        frame++
      } else if (rollIndex + 1 < this.currentRoll) {
        rollIndex += 2
        frame++
      } else {
        break
      }
    }
    
    return frame
  }
  
  private getFrameStart(): number {
    let frame = 0
    let rollIndex = 0
    
    while (frame < this.getFrameNumber()) {
      if (this.isStrike(rollIndex)) {
        rollIndex++
      } else {
        rollIndex += 2
      }
      frame++
    }
    
    return rollIndex
  }
  
  private checkGameComplete(): void {
    const frameNumber = this.getFrameNumber()
    
    if (frameNumber < 9) {
      return
    }
    
    if (frameNumber === 9) {
      const lastFrameStart = this.getFrameStart()
      const rollsInLastFrame = this.currentRoll - lastFrameStart
      
      if (this.isStrike(lastFrameStart)) {
        if (rollsInLastFrame >= 3) {
          this.gameComplete = true
        }
      } else if (this.isSpare(lastFrameStart)) {
        if (rollsInLastFrame >= 3) {
          this.gameComplete = true
        }
      } else {
        if (rollsInLastFrame >= 2) {
          this.gameComplete = true
        }
      }
    } else {
      this.gameComplete = true
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

  private sumOfBallsInFrame(rollIndex: number): number {
    return this.rolls[rollIndex] + this.rolls[rollIndex + 1]
  }
}
