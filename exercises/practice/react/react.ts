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
  name: string // for debugging
}

type ObserverR = {
  name?: string
}

type ObserverV<T> = {
  value?: T
  updateFn: UpdateFn<T>
}

type Observer<T> = ObserverR & ObserverV<T>

type SubjectR = {
  name?: string
  observers: Set<ObserverR>
}

type SubjectV<T> = {
  value: T
  equalFn?: EqualFn<T>
}

type Subject<T> = SubjectR & SubjectV<T>

// module Context value
let activeObserver: ObserverR | undefined
let updateQueue: Set<Observer<unknown>> = new Set()
let callbackQueue: Set<Observer<unknown>> = new Set()

function updateObserver<T>(observer: Observer<T>): void {
  const prevObserver = activeObserver
  activeObserver = observer
  const prevValue = observer.value
  observer.value = observer.updateFn(observer.value)
  activeObserver = prevObserver
  
  // If this is a callback observer, add to callback queue (to be called at end)
  if ('isCallback' in observer && observer.isCallback) {
    // Only add if this is not the initial call
    if (prevValue !== undefined) {
      callbackQueue.add(observer as Observer<unknown>)
    }
    return
  }
  
  // For computed observers, check if value changed and notify dependents
  if ('equalFn' in observer && observer.equalFn && typeof observer.equalFn === 'function' && observer.equalFn(prevValue, observer.value)) {
    return // Value didn't change, don't notify
  }
  
  // Add dependent observers to update queue
  if ('observers' in observer && observer.observers && typeof observer.observers.forEach === 'function') {
    observer.observers.forEach(obs => {
      if ('updateFn' in obs) {
        if ('isCallback' in obs && obs.isCallback) {
          if (!('unsubscribed' in obs) || !obs.unsubscribed) {
            callbackQueue.add(obs as Observer<unknown>)
          }
        } else {
          updateQueue.add(obs as Observer<unknown>)
        }
      }
    })
  }
}

function flushUpdates(): void {
  // Process all computed updates first
  while (updateQueue.size > 0) {
    const batch = Array.from(updateQueue)
    updateQueue.clear()
    batch.forEach(observer => updateObserver(observer))
  }
  
  // Then process all callbacks once at the end
  if (callbackQueue.size > 0) {
    const callbacks = Array.from(callbackQueue)
    callbackQueue.clear()
    callbacks.forEach(observer => {
      if ('unsubscribed' in observer && observer.unsubscribed) {
        return // Skip unsubscribed callbacks
      }
      const prevObserver = activeObserver
      activeObserver = observer
      observer.value = observer.updateFn(observer.value)
      activeObserver = prevObserver
    })
  }
}

/**
 * Creates an input closure. The value is accessed
 * via the accessor and changed via the
 * mutator returned as part an `InputPair<T>`.
 *
 * @typeParam T   - Type of the closure's value.
 *                By extension the type of the return
 *                value of the accessor and the type
 *                of the mutator's single argument.
 *
 * @param value   - Input closure's initial value.
 * @param equal   - By default the current and previous
 *                values are not compared so invoking
 *                the mutator with identical values
 *                will trigger updates on any
 *                subscribers. When `true` is
 *                specified the
 *                {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Strict_equality | strict equality operator}
 *                is used to compare values and
 *                mutations with unchanging values
 *                **are** suppressed.
 *                When `T` is a structural type
 *                it is necessary to provide a
 *                `(a: T, b: T) => boolean` comparison
 *                predicate instead.
 * @param options - Holder object for relevant options.
 *                Assigning a `name` to a subject can
 *                be useful during debugging.
 * @returns       - An `InputPair<T>`. The 1st
 *                element is the accessor (getter
 *                function), the 2nd element is
 *                the mutator (setter function).
 */
function createInput<T>(
  value: T,
  equal?: boolean | EqualFn<T>,
  options?: Options
): InputPair<T> {
  const s: Subject<T> = {
    name: options?.name,
    observers: new Set(),
    value,
    equalFn: equal === true ? (a, b) => a === b : equal === false ? undefined : equal,
  }

  const read: GetterFn<T> = () => {
    if (activeObserver) {
      s.observers.add(activeObserver)
      // Track subscription for unsubscribe
      if ('subscribers' in activeObserver && typeof activeObserver.subscribers.add === 'function') {
        activeObserver.subscribers.add(s)
      }
    }
    return s.value
  }

  const write: SetterFn<T> = (nextValue) => {
    const prevValue = s.value
    if (s.equalFn && s.equalFn(prevValue, nextValue)) {
      return s.value // Value didn't change
    }
    
    s.value = nextValue
    
    // Add all observers to update queue
    s.observers.forEach(obs => {
      if ('updateFn' in obs) {
        if ('isCallback' in obs && obs.isCallback) {
          if (!('unsubscribed' in obs) || !obs.unsubscribed) {
            updateQueue.add(obs as Observer<unknown>)
          }
        } else {
          updateQueue.add(obs as Observer<unknown>)
        }
      }
    })
    
    // Process all updates
    flushUpdates()
    
    return s.value
  }

  return [read, write]
}

/**
 * Creates a computed (derived) closure with the
 * supplied function which computes the current value
 * of the closure.
 *
 * @privateRemarks
 * `Observer<T>` may be good enough to get through
 * the enabled test case but more is needed to
 * get further ...
 *
 * @typeParam T   - Type of the closure's value.
 *                By extension the type of the value
 *                returned by the update function and
 *                of the value
 *                accepted by the function.
 *
 * @param updateFn - Update function. This function
 *                 references one or more accessors of
 *                 other subjects. It **should not**
 *                 perform side effects. It is expected
 *                 to return a value which will be the
 *                 value of the closure until the next
 *                 update. The closure's value is
 *                 supplied to this update function
 *                 on the next update.
 * @param value    - Initial value that is passed to
 *                 `updateFn` when it executes for the
 *                 first time.
 * @param equal    - By default the current and previous
 *                 values are not compared so updates
 *                 will be triggered even if the value
 *                 doesn't _change_. When `true` is
 *                 specified the
 *                 {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Strict_equality | strict equality operator}
 *                 is used to compare values and updates
 *                 with identical values **are**
 *                 suppressed. When `T` is a structural
 *                 type it is necessary to provide a
 *                 `(a: T, b: T) => boolean` comparison
 *                 predicate instead.
 * @param options  - Holder object for relevant options.
 *                 Assigning a `name` to a subject can
 *                 be useful during debugging.
 * @returns        - The accessor to the closure's
 *                 value (getter function). Retrieves
 *                 the closure's current value. Used by
 *                 observers (or more accurately their
 *                 update function) to obtain the
 *                 value (and to subscribe for
 *                 updates).
 */
function createComputed<T>(
  updateFn: UpdateFn<T>,
  value?: T,
  equal?: boolean | EqualFn<T>,
  options?: { name?: string }
): GetterFn<T> {
  const o: Observer<T> & { observers: Set<ObserverR>, equalFn?: EqualFn<T> } = {
    name: options?.name,
    value,
    updateFn,
    observers: new Set(),
    equalFn: equal === true ? (a, b) => a === b : equal === false ? undefined : equal,
  }
  
  updateObserver(o)
  
  return (): T => {
    if (activeObserver) {
      o.observers.add(activeObserver)
      // Track subscription for unsubscribe
      if ('subscribers' in activeObserver && typeof activeObserver.subscribers.add === 'function') {
        activeObserver.subscribers.add(o)
      }
    }
    return o.value!
  }
}

/**
 * Creates a callback closure with the supplied
 * function which is expected to perform side effects.
 *
 * @privateRemarks
 * `observer` isn't mean't to be an empty object literal.
 * Replace it with something more appropriate to its
 * purpose.
 *
 * @typeParam T    - Type of the closure's value.
 *                 By extension the type of the value
 *                 returned by the callback function
 *                 and of the value accepted by the
 *                 function.
 *
 * @param updateFn - Callback function. This function
 *                 references one or more accessors of
 *                 subjects. It may perform side effects.
 *                 It will also be passed the
 *                 value that it returned the last time it
 *                 was invoked.
 * @param value    - Initial value that is passed to
 *                 `updateFn` when it executes for
 *                  the first time.
 * @returns        - The `unsubscribe` function. Once
 *                 invoked the callback closure will
 *                 stop receiving updates from the
 *                 subjects it subscribed to.
 */
function createCallback<T>(updateFn: UpdateFn<T>, value?: T): UnsubscribeFn {
  const observer: Observer<T> & { isCallback: boolean, subscribers: Set<Subject<unknown> | Observer<unknown>>, unsubscribed: boolean } = {
    value,
    updateFn,
    isCallback: true,
    subscribers: new Set(),
    unsubscribed: false,
  }
  
  // Execute the callback initially to establish dependencies
  updateObserver(observer)
  
  return (): void => {
    if (observer.unsubscribed) return // Already unsubscribed
    
    observer.unsubscribed = true
    
    // Remove this observer from all subjects it's subscribed to
    observer.subscribers.forEach(sub => {
      if ('observers' in sub) {
        sub.observers.delete(observer)
      }
    })
    observer.subscribers.clear()
  }
}

export { createInput, createComputed, createCallback }
