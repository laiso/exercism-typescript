// Simple debug test for bowling validation
console.log('Testing bowling validation logic...');

// Simulate the bowling class logic
class TestBowling {
  constructor() {
    this.rolls = [];
    this.currentRoll = 0;
    this.gameComplete = false;
  }

  getFrameNumber() {
    let frame = 0;
    let rollIndex = 0;
    
    while (rollIndex < this.currentRoll && frame < 9) {
      if (this.rolls[rollIndex] === 10) {
        rollIndex++;
        frame++;
      } else if (rollIndex + 1 < this.currentRoll) {
        rollIndex += 2;
        frame++;
      } else {
        break;
      }
    }
    
    return frame;
  }
  
  getFrameStart() {
    let frame = 0;
    let rollIndex = 0;
    
    while (frame < this.getFrameNumber()) {
      if (this.rolls[rollIndex] === 10) {
        rollIndex++;
      } else {
        rollIndex += 2;
      }
      frame++;
    }
    
    return rollIndex;
  }

  roll(pins) {
    console.log(`\nRolling ${pins}:`);
    console.log(`  Before: currentRoll=${this.currentRoll}, rolls=[${this.rolls.join(',')}]`);
    
    const frameNumber = this.getFrameNumber();
    const frameStart = this.getFrameStart();
    const rollsInCurrentFrame = this.currentRoll - frameStart;
    
    console.log(`  frameNumber=${frameNumber}, frameStart=${frameStart}, rollsInFrame=${rollsInCurrentFrame}`);
    
    if (frameNumber < 9) {
      if (rollsInCurrentFrame === 1 && this.rolls[frameStart] !== 10) {
        console.log(`  Validation check: rolls[${frameStart}]=${this.rolls[frameStart]} + ${pins} = ${this.rolls[frameStart] + pins}`);
        if (this.rolls[frameStart] + pins > 10) {
          throw new Error('Pin count exceeds pins on the lane');
        }
      }
    }
    
    this.rolls[this.currentRoll++] = pins;
    console.log(`  After: currentRoll=${this.currentRoll}, rolls=[${this.rolls.join(',')}]`);
  }
}

const bowling = new TestBowling();
console.log('Created bowling instance');

try {
  bowling.roll(5);
  console.log('Successfully rolled 5');
  
  bowling.roll(6);
  console.log('ERROR: No exception thrown! This is the problem.');
} catch (e) {
  console.log('SUCCESS: Exception thrown:', e.message);
}
