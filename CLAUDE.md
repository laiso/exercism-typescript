# Environment

## Testing

- `corepack yarn test` - Run complete test suite (compilation, type tests, implementation)
- `corepack yarn test:implementation` - Run Jest implementation tests only
- `corepack yarn test:types` - Run tstyche type tests (if configured)

## Linting and Type Checking

- `corepack yarn lint:types` - TypeScript compilation check
- `corepack yarn lint:ci` - ESLint validation

1. **TypeScript Compilation** - Validates syntax and type correctness
2. **Type Testing** - Static analysis via tstyche (when enabled)
3. **Implementation Testing** - Runtime behavior validation with Jest

## Testing Framework

- Jest with Babel transpilation for ES modules
- TypeScript 5.6+ with strict mode
- Node.js 18.16.0+ or 20.0.0+ required
