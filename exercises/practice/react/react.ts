type EqualFn<T> = (lhs: T, rhs: T) => boolean
type GetterFn<T> = () => T
type SetterFn<T> = (value: T) => T
type UnsubscribeFn = () => void
type UpdateFn<T> = (value?: T) => T

type InputPair<T> = [GetterFn<T>, SetterFn<T>]

type Options = {
  name?: string
}

interface Cell<T> {
  getValue(): T
  addObserver(observer: Observer<any>): void
  removeObserver(observer: Observer<any>): void
  notifyObservers(): void
}

interface Observer<T> {
  update(): void
  getValue(): T
  equalFn?: EqualFn<T>
}

let activeObserver: Observer<any> | undefined
let updateQueue: Set<Observer<any>> = new Set()
let callbackQueue: Set<CallbackObserver<any>> = new Set()
let isUpdating = false

function flushUpdates(): void {
  while (updateQueue.size > 0) {
    const observers = Array.from(updateQueue).filter(obs => !(obs instanceof CallbackObserver))
    updateQueue.clear()
    for (const observer of observers) {
      observer.update()
    }
  }
  
  for (const callback of callbackQueue) {
    callback.update()
  }
  callbackQueue.clear()
  
  isUpdating = false
}

function scheduleUpdate(observer: Observer<any>): void {
  if (observer instanceof CallbackObserver) {
    callbackQueue.add(observer)
  } else {
    updateQueue.add(observer)
  }
}

class InputCell<T> implements Cell<T> {
  private value: T
  private observers: Set<Observer<any>> = new Set()

  constructor(value: T) {
    this.value = value
  }

  getValue(): T {
    if (activeObserver) {
      this.addObserver(activeObserver)
      if (activeObserver instanceof CallbackObserver || activeObserver instanceof ComputedCell) {
        (activeObserver as any).dependencies.add(this)
      }
    }
    return this.value
  }

  setValue(value: T): void {
    this.value = value
    this.notifyObservers()
  }

  addObserver(observer: Observer<any>): void {
    this.observers.add(observer)
  }

  removeObserver(observer: Observer<any>): void {
    this.observers.delete(observer)
  }

  notifyObservers(): void {
    if (isUpdating) {
      for (const observer of this.observers) {
        scheduleUpdate(observer)
      }
    } else {
      isUpdating = true
      for (const observer of this.observers) {
        scheduleUpdate(observer)
      }
      flushUpdates()
    }
  }

}

class ComputedCell<T> implements Cell<T>, Observer<T> {
  private value: T
  private updateFn: UpdateFn<T>
  private observers: Set<Observer<any>> = new Set()
  public dependencies: Set<Cell<any>> = new Set()
  public equalFn?: EqualFn<T>

  constructor(updateFn: UpdateFn<T>, equalFn?: boolean | EqualFn<T>) {
    this.updateFn = updateFn
    if (equalFn === true) {
      this.equalFn = (a, b) => a === b
    } else if (typeof equalFn === 'function') {
      this.equalFn = equalFn
    }
    
    this.value = this.computeValue()
  }

  private computeValue(): T {
    const prevObserver = activeObserver
    activeObserver = this
    this.dependencies.clear()
    
    const newValue = this.updateFn(this.value)
    
    activeObserver = prevObserver
    return newValue
  }

  getValue(): T {
    if (activeObserver) {
      this.addObserver(activeObserver)
      if (activeObserver instanceof CallbackObserver || activeObserver instanceof ComputedCell) {
        (activeObserver as any).dependencies.add(this)
      }
    }
    return this.value
  }

  update(): void {
    const oldValue = this.value
    const newValue = this.computeValue()
    
    if (!this.equalFn || !this.equalFn(oldValue, newValue)) {
      this.value = newValue
      this.notifyObservers()
    }
  }

  addObserver(observer: Observer<any>): void {
    this.observers.add(observer)
  }

  removeObserver(observer: Observer<any>): void {
    this.observers.delete(observer)
  }

  notifyObservers(): void {
    if (isUpdating) {
      for (const observer of this.observers) {
        scheduleUpdate(observer)
      }
    } else {
      isUpdating = true
      for (const observer of this.observers) {
        scheduleUpdate(observer)
      }
      flushUpdates()
    }
  }
}

class CallbackObserver<T> implements Observer<T> {
  private updateFn: UpdateFn<T>
  private value: T | undefined
  public dependencies: Set<Cell<any>> = new Set()

  constructor(updateFn: UpdateFn<T>) {
    this.updateFn = updateFn
    this.update()
  }

  getValue(): T {
    return this.value!
  }

  update(): void {
    const prevObserver = activeObserver
    activeObserver = this
    
    for (const dep of this.dependencies) {
      dep.removeObserver(this)
    }
    this.dependencies.clear()
    
    this.value = this.updateFn(this.value)
    
    activeObserver = prevObserver
  }

  unsubscribe(): void {
    for (const dep of this.dependencies) {
      dep.removeObserver(this)
    }
    this.dependencies.clear()
  }
}

function createInput<T>(
  value: T,
  _equal?: boolean | EqualFn<T>,
  _options?: Options
): InputPair<T> {
  const cell = new InputCell(value)

  const read: GetterFn<T> = () => cell.getValue()
  const write: SetterFn<T> = (nextValue) => {
    cell.setValue(nextValue)
    return nextValue
  }

  return [read, write]
}

function createComputed<T>(
  updateFn: UpdateFn<T>,
  _value?: T,
  equal?: boolean | EqualFn<T>,
  _options?: { name?: string }
): GetterFn<T> {
  const cell = new ComputedCell(updateFn, equal)
  return () => cell.getValue()
}

function createCallback<T>(updateFn: UpdateFn<T>, _value?: T): UnsubscribeFn {
  const observer = new CallbackObserver(updateFn)
  return () => observer.unsubscribe()
}

export { createInput, createComputed, createCallback }
