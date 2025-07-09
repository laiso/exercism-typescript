//
// Delete and replace stub with your own implementation
//
// Inspired by "How it Works":
// https://indepth.dev/posts/1269/finding-fine-grained-reactive-programming#how-it-works
// https://levelup.gitconnected.com/finding-fine-grained-reactive-programming-89741994ddee?source=friends_link&sk=31c66a70c1dce7dd5f3f4229423ad127#4543
//
// and "Computations":
// https://github.com/ryansolid/solid/blob/master/documentation/reactivity.md#user-content-computations
//

/**
 * Type for the closure's value equality predicate.
 *
 * @typeParam T - Type of the values being compared for
 *              equality.
 *
 * @remarks
 * Conceptually this function should be equivalent
 * to: `lhs === rhs`
 *
 * @param lhs   - left hand side value
 * @param rhs   - right hand side value
 * @returns     - `true` if values are considered
 *                equal; `false` otherwise.
 */
type EqualFn<T> = (lhs: T, rhs: T) => boolean
type GetterFn<T> = () => T
type SetterFn<T> = (value: T) => T
type UnsubscribeFn = () => void
type UpdateFn<T> = (value?: T) => T

type InputPair<T> = [GetterFn<T>, SetterFn<T>]

type Options = {
  name?: string
}

// Global state for tracking the currently active observer
let activeObserver: Observer<any> | null = null

// Observer interface for computed cells and callbacks
interface Observer<T> {
  updateFn: UpdateFn<T>
  value?: T
  dependencies: Set<Subject<any>>
  name?: string
}

// Subject interface for input cells
interface Subject<T> {
  value: T
  observers: Set<Observer<any>>
  equalFn?: EqualFn<T>
  name?: string
}

/**
 * Creates an input closure. The value is accessed
 * via the accessor and changed via the
 * mutator returned as part an `InputPair<T>`.
 */
function createInput<T>(
  value: T,
  equal?: boolean | EqualFn<T>,
  options?: Options
): InputPair<T> {
  const equalFn = typeof equal === 'function' ? equal : equal === true ? ((a: T, b: T) => a === b) : undefined
  
  const subject: Subject<T> = {
    value,
    observers: new Set(),
    equalFn,
    name: options?.name,
  }

  const read: GetterFn<T> = () => {
    if (activeObserver) {
      subject.observers.add(activeObserver)
      activeObserver.dependencies.add(subject)
    }
    return subject.value
  }

  const write: SetterFn<T> = (nextValue) => {
    const oldValue = subject.value
    subject.value = nextValue
    
    // Check if value actually changed
    if (!subject.equalFn || !subject.equalFn(oldValue, nextValue)) {
      // Notify all observers
      const observersToUpdate = new Set(subject.observers)
      observersToUpdate.forEach(observer => {
        updateObserver(observer)
      })
    }
    
    return subject.value
  }

  return [read, write]
}

/**
 * Updates an observer by running its update function
 */
function updateObserver<T>(observer: Observer<T>): void {
  const prevObserver = activeObserver
  activeObserver = observer
  
  // Clear old dependencies
  observer.dependencies.forEach(dep => {
    dep.observers.delete(observer)
  })
  observer.dependencies.clear()
  
  // Run update function to get new value and establish new dependencies
  observer.value = observer.updateFn(observer.value)
  
  activeObserver = prevObserver
}

/**
 * Creates a computed (derived) closure with the
 * supplied function which computes the current value
 * of the closure.
 */
function createComputed<T>(
  updateFn: UpdateFn<T>,
  value?: T,
  equal?: boolean | EqualFn<T>,
  options?: Options
): GetterFn<T> {
  const equalFn = typeof equal === 'function' ? equal : equal === true ? ((a: T, b: T) => a === b) : undefined
  
  const observer: Observer<T> = {
    updateFn,
    value,
    dependencies: new Set(),
    name: options?.name,
  }
  
  // Initial computation
  updateObserver(observer)
  
  const read: GetterFn<T> = () => {
    if (activeObserver) {
      observer.dependencies.forEach(dep => {
        dep.observers.add(activeObserver!)
        activeObserver!.dependencies.add(dep)
      })
    }
    return observer.value!
  }
  
  return read
}

/**
 * Creates a callback closure with the supplied
 * function which is expected to perform side effects.
 */
function createCallback<T>(
  updateFn: UpdateFn<T>,
  value?: T
): UnsubscribeFn {
  const observer: Observer<T> = {
    updateFn,
    value,
    dependencies: new Set(),
  }
  
  // Initial execution
  updateObserver(observer)
  
  // Return unsubscribe function
  return () => {
    observer.dependencies.forEach(dep => {
      dep.observers.delete(observer)
    })
    observer.dependencies.clear()
  }
}

export { createInput, createComputed, createCallback }
