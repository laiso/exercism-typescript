# AGENT INSTRUCTIONS

## Task: Solve All Exercism TypeScript Practice Exercises

### Purpose
This guide explains how to solve **all** practice exercises located in the `exercises/practice` directory, not just a single exercise.

### Instructions Location
For each exercise, read the instructions at:
```
exercises/practice/<exercise-name>/.docs/instructions.md
```

### Procedure

1. **Read the Instructions for Each Exercise**
   - Before coding, always open
     ```
     exercises/practice/<exercise-name>/.docs/instructions.md
     ```
     and review the requirements and constraints for that exercise.

2. **Install Dependencies (if not already installed)**
   ```sh
   corepack yarn install
   ```

3. **Solve Every Practice Exercise**
   1. Read the instructions for the current exercise.
   2. Implement your solution in the provided template file (typically `<exercise-name>.ts`) inside the exercise directory.
   3. Modify additional files only when the exercise explicitly instructs you to do so.

4. **Verify All Tests Pass**
   - You must finish **all** practice exercises under `exercises/practice`—submitting just `hello-world` or a single exercise is not acceptable.
   - After completing every solution, run the full test suite and confirm that it succeeds:
     ```sh
     corepack yarn test
     ```
   - Your work is complete only when **every** practice exercise is solved and all tests pass.

5. **(Optional) Run Tests for a Specific Exercise**
   ```sh
   corepack yarn test exercises/practice/<exercise-name>/<exercise-name>.test.ts
   ```

### Notes
- Each exercise may define unique requirements or file layouts; always check its documentation.
- When tests fail, inspect the failure messages and adjust your implementation accordingly.
- Some exercises may include extra setup steps or notes inside their documentation.

---

### Example Workflow

1. Read the instructions at `exercises/practice/hello-world/.docs/instructions.md`.
2. Update the solution file `exercises/practice/hello-world/hello-world.ts`.
3. Repeat this process for **every** directory in `exercises/practice`.
4. Once all exercises are solved, run:
   ```sh
   corepack yarn test
   ```
   and ensure that the command passes without failures.

If questions arise, consult the repository README or contact the repository maintainer.
