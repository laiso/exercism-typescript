#!/bin/bash


EXERCISES_DIR="exercises/practice"
FAILED_EXERCISES=()
PASSED_EXERCISES=()

echo "Testing all practice exercises..."
echo "================================"

for exercise_dir in "$EXERCISES_DIR"/*; do
    if [ -d "$exercise_dir" ]; then
        exercise_name=$(basename "$exercise_dir")
        echo "Testing $exercise_name..."
        
        cd "$exercise_dir"
        
        if [ ! -d "node_modules" ]; then
            echo "  Installing dependencies for $exercise_name..."
            corepack yarn install --no-immutable > /dev/null 2>&1
        fi
        
        if corepack yarn node test-runner.mjs > /dev/null 2>&1; then
            echo "  ✅ $exercise_name PASSED"
            PASSED_EXERCISES+=("$exercise_name")
        else
            echo "  ❌ $exercise_name FAILED"
            FAILED_EXERCISES+=("$exercise_name")
        fi
        
        cd - > /dev/null
    fi
done

echo ""
echo "================================"
echo "Test Results Summary:"
echo "Passed: ${#PASSED_EXERCISES[@]}"
echo "Failed: ${#FAILED_EXERCISES[@]}"

if [ ${#FAILED_EXERCISES[@]} -gt 0 ]; then
    echo ""
    echo "Failed exercises:"
    for failed in "${FAILED_EXERCISES[@]}"; do
        echo "  - $failed"
    done
    exit 1
else
    echo ""
    echo "🎉 All exercises passed!"
    exit 0
fi
