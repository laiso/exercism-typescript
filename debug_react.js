import { createInput, createComputed } from './exercises/practice/react/react.ts';

console.log('Testing basic reactive system...');

try {
  const [input, setInput] = createInput(1);
  console.log('Created input with value 1');
  console.log('input() =', input());
  
  const timesTwo = createComputed(() => {
    const val = input();
    console.log('timesTwo computing: input() =', val, 'result =', val * 2);
    return val * 2;
  });
  
  console.log('Created timesTwo computed');
  console.log('timesTwo() =', timesTwo());
  
  console.log('\nChanging input to 3...');
  setInput(3);
  console.log('input() =', input());
  console.log('timesTwo() =', timesTwo());
  
} catch (error) {
  console.error('Error:', error.message);
}
