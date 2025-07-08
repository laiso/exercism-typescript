const fs = require('fs');

const bowlingCode = fs.readFileSync('./tmp_exercises/bowling.js', 'utf8');

console.log('Testing bowling validation...');

eval(bowlingCode);

const bowling = new Bowling();
console.log('Created bowling instance');

console.log('Rolling 5...');
bowling.roll(5);
console.log('Successfully rolled 5');

console.log('Rolling 6...');
try {
  bowling.roll(6);
  console.log('ERROR: No exception thrown! This is the problem.');
} catch (e) {
  console.log('SUCCESS: Exception thrown:', e.message);
}
