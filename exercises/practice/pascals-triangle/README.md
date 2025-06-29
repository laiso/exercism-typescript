
# Pascal's Triangle

This project provides a TypeScript implementation for generating Pascal's triangle.

## Implementation

The core logic is encapsulated in the `Triangle` class, which can be found in the `pascals-triangle.ts` file. This class generates a specified number of rows of Pascal's triangle upon instantiation.

### `Triangle` Class

- **`constructor(rowCount: number)`**: Initializes a new instance of the `Triangle` class. The `rowCount` parameter determines how many rows of Pascal's triangle to generate.

- **`rows: number[][]`**: A read-only property that returns all the generated rows of Pascal's triangle as an array of number arrays.

- **`lastRow: number[]`**: A read-only property that provides quick access to the last generated row.

### Example Usage

To use the `Triangle` class, you can import it and create a new instance with the desired number of rows:

```typescript
import { Triangle } from './pascals-triangle';

// Generate 5 rows of Pascal's triangle
const triangle = new Triangle(5);

// Access all the rows
console.log(triangle.rows);
// Output:
// [
//   [1],
//   [1, 1],
//   [1, 2, 1],
//   [1, 3, 3, 1],
//   [1, 4, 6, 4, 1]
// ]

// Access only the last row
console.log(triangle.lastRow);
// Output:
// [1, 4, 6, 4, 1]
```

The implementation handles the edge case of zero rows and ensures that the properties are read-only to prevent external modifications.

## Development

This project is set up with TypeScript and Jest for testing. The following scripts are available for development:

- `corepack yarn test`: Runs the complete test suite.
- `corepack yarn lint:ci`: Lints the code to ensure style consistency.
- `corepack yarn lint:types`: Checks for TypeScript type errors.

The solution has been fully tested and verified to meet the requirements of the exercise.
