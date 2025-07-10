export class Bowling {
  private rolls: number[] = [];

  public roll(pins: number): void {
    if (pins < 0) {
      throw new Error('Negative roll is invalid');
    }
    if (pins > 10) {
      throw new Error('Pin count exceeds pins on the lane');
    }
    const max = this.getMaxPins(this.rolls.length);
    if (max < 0) {
      throw new Error('Cannot roll after game is over');
    }
    if (pins > max) {
      throw new Error('Pin count exceeds pins on the lane');
    }
    this.rolls.push(pins);
  }

  public score(): number {
    if (this.getMaxPins(this.rolls.length) >= 0) {
      throw new Error('Score cannot be taken until the end of the game');
    }
    let total = 0;
    let rollIndex = 0;
    for (let frame = 0; frame < 10; frame++) {
      if (this.rolls[rollIndex] === 10) {
        total += 10 + this.rolls[rollIndex + 1] + this.rolls[rollIndex + 2];
        rollIndex += 1;
      } else if (this.rolls[rollIndex] + this.rolls[rollIndex + 1] === 10) {
        total += 10 + this.rolls[rollIndex + 2];
        rollIndex += 2;
      } else {
        total += this.rolls[rollIndex] + this.rolls[rollIndex + 1];
        rollIndex += 2;
      }
    }
    return total;
  }

  private getMaxPins(rollIndex: number): number {
    let currentRoll = 0;
    for (let f = 1; f < 10; f++) {
      if (currentRoll >= rollIndex) {
        const rollsInFrame = rollIndex - currentRoll;
        if (rollsInFrame === 0) return 10;
        if (rollsInFrame === 1) return 10 - this.rolls[currentRoll];
        return -1;
      }
      if (currentRoll + 1 > rollIndex) {
        return 10;
      }
      const firstPins = this.rolls[currentRoll];
      if (firstPins === 10) {
        currentRoll += 1;
      } else {
        if (currentRoll + 2 > rollIndex) {
          return 10 - firstPins;
        }
        currentRoll += 2;
      }
    }
    const rollsInFrame = rollIndex - currentRoll;
    if (rollsInFrame > 2) return -1;
    if (rollsInFrame === 0) return 10;
    if (rollsInFrame === 1) {
      const first = this.rolls[currentRoll];
      return first === 10 ? 10 : 10 - first;
    }
    const first = this.rolls[currentRoll];
    const second = this.rolls[currentRoll + 1];
    if (first === 10 || first + second === 10) {
      if (first === 10 && second !== 10) {
        return 10 - second;
      }
      return 10;
    }
    return -1;
  }
}
