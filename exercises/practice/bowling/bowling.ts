export class Bowling {
  private rolls: number[] = []
  private currentFrame: number = 1
  private currentRoll: number = 1
  private gameOver: boolean = false

  public roll(pins: number): void {
    // Validate the roll
    if (pins < 0) {
      throw new Error('Negative roll is invalid')
    }
    
    if (pins > 10) {
      throw new Error('Pin count exceeds pins on the lane')
    }
    
    // Check if game is over
    if (this.gameOver) {
      throw new Error('Cannot roll after game is over')
    }
    
    // Validate frame total (except for strikes and 10th frame)
    if (this.currentFrame < 10) {
      if (this.currentRoll === 2 && this.rolls.length > 0) {
        const firstRoll = this.rolls[this.rolls.length - 1]
        if (firstRoll !== 10 && firstRoll + pins > 10) {
          throw new Error('Pin count exceeds pins on the lane')
        }
      }
    } else {
      // 10th frame validation
      if (this.currentRoll === 2) {
        const firstRoll = this.rolls[this.rolls.length - 1]
        if (firstRoll !== 10 && firstRoll + pins > 10) {
          throw new Error('Pin count exceeds pins on the lane')
        }
      } else if (this.currentRoll === 3) {
        const firstRoll = this.rolls[this.rolls.length - 2]
        const secondRoll = this.rolls[this.rolls.length - 1]
        
        if (firstRoll === 10) {
          // Strike in 10th frame
          if (secondRoll !== 10 && secondRoll + pins > 10) {
            throw new Error('Pin count exceeds pins on the lane')
          }
        } else {
          // Spare in 10th frame
          if (pins > 10) {
            throw new Error('Pin count exceeds pins on the lane')
          }
        }
      }
    }
    
    // Add the roll
    this.rolls.push(pins)
    
    // Update frame and roll counters
    if (this.currentFrame < 10) {
      if (pins === 10 || this.currentRoll === 2) {
        this.currentFrame++
        this.currentRoll = 1
      } else {
        this.currentRoll = 2
      }
    } else {
      // 10th frame
      if (this.currentRoll === 1) {
        if (pins === 10) {
          this.currentRoll = 2
        } else {
          this.currentRoll = 2
        }
      } else if (this.currentRoll === 2) {
        const firstRoll = this.rolls[this.rolls.length - 2]
        if (firstRoll === 10 || firstRoll + pins === 10) {
          this.currentRoll = 3
        } else {
          this.gameOver = true
        }
      } else if (this.currentRoll === 3) {
        this.gameOver = true
      }
    }
  }

  public score(): number {
    if (!this.gameOver) {
      throw new Error('Score cannot be taken until the end of the game')
    }
    
    let score = 0
    let rollIndex = 0
    
    for (let frame = 1; frame <= 10; frame++) {
      if (rollIndex >= this.rolls.length) {
        throw new Error('Score cannot be taken until the end of the game')
      }
      
      const firstRoll = this.rolls[rollIndex]
      
      if (firstRoll === 10) {
        // Strike
        if (rollIndex + 2 >= this.rolls.length) {
          throw new Error('Score cannot be taken until the end of the game')
        }
        score += 10 + this.rolls[rollIndex + 1] + this.rolls[rollIndex + 2]
        rollIndex += 1
      } else {
        // Not a strike
        if (rollIndex + 1 >= this.rolls.length) {
          throw new Error('Score cannot be taken until the end of the game')
        }
        
        const secondRoll = this.rolls[rollIndex + 1]
        const frameTotal = firstRoll + secondRoll
        
        if (frameTotal === 10) {
          // Spare
          if (rollIndex + 2 >= this.rolls.length) {
            throw new Error('Score cannot be taken until the end of the game')
          }
          score += 10 + this.rolls[rollIndex + 2]
        } else {
          // Open frame
          score += frameTotal
        }
        
        rollIndex += 2
      }
    }
    
    return score
  }
}
