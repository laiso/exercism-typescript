export class Bowling {
  private readonly rolls: number[] = [];

  public roll(pins: number): void {
    this.validateRoll(pins);
    this.rolls.push(pins);
  }

  public score(): number {
    if (!this.isGameFinished()) {
      throw new Error('Score cannot be taken until the end of the game');
    }
    let score = 0;
    let rollIndex = 0;
    for (let frame = 0; frame < 10; frame++) {
      if (this.isStrike(rollIndex)) {
        score += 10 + this.strikeBonus(rollIndex);
        rollIndex++;
      } else if (this.isSpare(rollIndex)) {
        score += 10 + this.spareBonus(rollIndex);
        rollIndex += 2;
      } else {
        score += this.frameSum(rollIndex);
        rollIndex += 2;
      }
    }
    return score;
  }

  private validateRoll(pins: number): void {
    if (pins < 0) {
      throw new Error('Negative roll is invalid');
    }
    if (pins > 10) {
      throw new Error('Pin count exceeds pins on the lane');
    }

    if (this.isGameFinished()) {
      throw new Error('Cannot roll after game is over');
    }

    let frame = 1;
    let rollIndex = 0;
    while (rollIndex < this.rolls.length && frame < 10) {
      if (this.isStrike(rollIndex)) {
        rollIndex++;
        frame++;
      } else {
        if (rollIndex + 1 === this.rolls.length) {
          if (this.rolls[rollIndex] + pins > 10) {
            throw new Error('Pin count exceeds pins on the lane');
          }
        }
        rollIndex += 2;
        frame++;
      }
    }
    
    if (frame === 10) {
        const tenthFrameRolls = this.rolls.slice(rollIndex);
        if (tenthFrameRolls.length === 1) {
            if (tenthFrameRolls[0] < 10 && tenthFrameRolls[0] + pins > 10) {
                throw new Error('Pin count exceeds pins on the lane');
            }
        } else if (tenthFrameRolls.length === 2) {
            if (tenthFrameRolls[0] === 10 && tenthFrameRolls[1] < 10 && tenthFrameRolls[1] + pins > 10) {
                throw new Error('Pin count exceeds pins on the lane');
            }
        }
    }
  }

  private isGameFinished(): boolean {
    let frame = 1;
    let rollIndex = 0;
    while (rollIndex < this.rolls.length && frame < 10) {
      if (this.isStrike(rollIndex)) {
        rollIndex++;
        frame++;
      } else {
        rollIndex += 2;
        frame++;
      }
    }

    if (frame < 10) {
      return false;
    }

    const tenthFrameRolls = this.rolls.slice(rollIndex);
    if (tenthFrameRolls.length === 0) return false;

    const isTenthStrike = tenthFrameRolls[0] === 10;
    const isTenthSpare = tenthFrameRolls.length > 1 && tenthFrameRolls[0] + tenthFrameRolls[1] === 10;

    if (isTenthStrike || isTenthSpare) {
      return tenthFrameRolls.length === 3;
    }

    return tenthFrameRolls.length === 2;
  }

  private isStrike(rollIndex: number): boolean {
    return this.rolls[rollIndex] === 10;
  }

  private strikeBonus(rollIndex: number): number {
    return this.rolls[rollIndex + 1] + this.rolls[rollIndex + 2];
  }

  private isSpare(rollIndex: number): boolean {
    return this.rolls[rollIndex] + this.rolls[rollIndex + 1] === 10;
  }

  private spareBonus(rollIndex: number): number {
    return this.rolls[rollIndex + 2];
  }

  private frameSum(rollIndex: number): number {
    return this.rolls[rollIndex] + this.rolls[rollIndex + 1];
  }
}
