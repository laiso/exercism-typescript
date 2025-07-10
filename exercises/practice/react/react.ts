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
type SetterFn<T> = (value: T | ((prev: T) => T)) => T
type UnsubscribeFn = () => void
type UpdateFn<T> = (value?: T) => T

type Options = {
  name?: string // for debugging
}

let activeObserver: Observer | null = null

interface Signal<T> {
  value: T
  equalFn?: EqualFn<T>
  observers: Set<Observer>
  name?: string
  observer?: ComputedObserver<T>
}

interface Observer {
  name?: string
  dependencies: Set<Signal<any>>
  execute(): boolean // returns whether the value changed
}

interface ComputedObserver<T> extends Observer {
  updateFn: UpdateFn<T>
  signal: Signal<T>
}

interface EffectObserver extends Observer {
  updateFn: UpdateFn<any>
}

function createInput<T>(
  value: T,
  equal?: boolean | EqualFn<T>,
  options?: Options
): [GetterFn<T>, SetterFn<T>] {
  const equalFn: EqualFn<T> | undefined = typeof equal === 'function' ? equal : equal === true ? (a: T, b: T) => a === b : undefined

  const signal: Signal<T> = {
    value,
    equalFn,
    observers: new Set(),
    name: options?.name
  }

  const getter: GetterFn<T> = () => {
    if (activeObserver) {
      signal.observers.add(activeObserver)
      activeObserver.dependencies.add(signal)
    }
    return signal.value
  }

  const setter: SetterFn<T> = (newValue) => {
    const value = typeof newValue === 'function' ? (newValue as (prev: T) => T)(signal.value) : newValue
    if (signal.equalFn && signal.equalFn(signal.value, value)) return value

    signal.value = value

    triggerUpdates(signal)

    return value
  }

  return [getter, setter]
}

function triggerUpdates<T>(changedSignal: Signal<T>) {
  // Collect all affected observers
  const affected = new Set<Observer>()
  const stack: Signal<any>[] = [changedSignal]
  const visited = new Set<Signal<any>>()

  while (stack.length) {
    const sig = stack.pop()!
    if (visited.has(sig)) continue
    visited.add(sig)
    for (const obs of sig.observers) {
      affected.add(obs)
      if ('updateFn' in obs && 'signal' in obs) {
        stack.push(obs.signal as Signal<any>)
      }
    }
  }

  // Build graph and indegrees
  const indegrees = new Map<Observer, number>()
  const graph = new Map<Observer, Observer[]>()

  for (const obs of affected) {
    graph.set(obs, [])
    indegrees.set(obs, 0)
  }

  for (const obs of affected) {
    for (const dep of obs.dependencies) {
      if (dep.observer && affected.has(dep.observer)) {
        graph.get(dep.observer)!.push(obs)
        indegrees.set(obs, indegrees.get(obs)! + 1)
      }
    }
  }

  // Initial queue: zero indegree
  const runQueue: Observer[] = []
  for (const [obs, deg] of indegrees) {
    if (deg === 0) runQueue.push(obs)
  }

  // Run
  while (runQueue.length) {
    const obs = runQueue.shift()!
    const changed = obs.execute()
    if (changed) {
      const dependents = graph.get(obs) || []
      for (const dep of dependents) {
        const newDeg = indegrees.get(dep)! - 1
        indegrees.set(dep, newDeg)
        if (newDeg === 0) runQueue.push(dep)
      }
    }
  }
}

function createComputed<T>(
  updateFn: UpdateFn<T>,
  value?: T,
  equal?: boolean | EqualFn<T>,
  options?: { name?: string }
): GetterFn<T> {
  const equalFn: EqualFn<T> | undefined = typeof equal === 'function' ? equal : equal === true ? (a: T, b: T) => a === b : undefined

  const signal: Signal<T> = {
    value: value!,
    equalFn,
    observers: new Set(),
    name: options?.name
  }

  const observer: ComputedObserver<T> = {
    name: options?.name,
    dependencies: new Set(),
    updateFn,
    signal,
    execute() {
      // Clear dependencies
      for (const dep of this.dependencies) {
        dep.observers.delete(this)
      }
      this.dependencies.clear()

      const prevObserver = activeObserver
      activeObserver = this
      const newValue = this.updateFn(this.signal.value)
      activeObserver = prevObserver

      if (this.signal.equalFn && this.signal.equalFn(this.signal.value, newValue)) {
        return false
      }

      this.signal.value = newValue
      return true
    }
  }

  signal.observer = observer

  // Initial computation
  observer.execute()

  const getter: GetterFn<T> = () => {
    if (activeObserver) {
      signal.observers.add(activeObserver)
      activeObserver.dependencies.add(signal)
    }
    return signal.value
  }

  return getter
}

function createCallback<T>(
  updateFn: UpdateFn<T>,
  value?: T
): UnsubscribeFn {
  const observer: EffectObserver = {
    name: undefined,
    dependencies: new Set(),
    updateFn,
    execute() {
      // Clear dependencies
      for (const dep of this.dependencies) {
        dep.observers.delete(this)
      }
      this.dependencies.clear()

      const prevObserver = activeObserver
      activeObserver = this
      this.updateFn(value)
      activeObserver = prevObserver
      return true // Assuming it "changed"
    }
  }

  // Initial execution
  observer.execute()

  return () => {
    for (const dep of observer.dependencies) {
      dep.observers.delete(observer)
    }
    observer.dependencies.clear()
  }
}

export { createInput, createComputed, createCallback }
