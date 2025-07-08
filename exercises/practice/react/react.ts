type EqualFn<T> = (lhs: T, rhs: T) => boolean
type GetterFn<T> = () => T
type SetterFn<T> = (value: T) => T
type UnsubscribeFn = () => void
type UpdateFn<T> = (value?: T) => T

type InputPair<T> = [GetterFn<T>, SetterFn<T>]

type Options = {
  name?: string
}

interface Observer {
  name?: string
  update(): void
}

let activeObserver: Observer | undefined

class ReactiveCell<T> {
  name?: string
  value: T
  equalFn?: EqualFn<T>
  observers = new Set<Observer>()

  constructor(value: T, equalFn?: EqualFn<T>, name?: string) {
    this.value = value
    this.equalFn = equalFn
    this.name = name
  }

  subscribe(observer: Observer): void {
    this.observers.add(observer)
  }

  unsubscribe(observer: Observer): void {
    this.observers.delete(observer)
  }

  notify(): void {
    const observersToNotify = Array.from(this.observers)
    for (const observer of observersToNotify) {
      observer.update()
    }
  }

  setValue(newValue: T): T {
    const shouldUpdate = !this.equalFn || !this.equalFn(this.value, newValue)
    this.value = newValue
    if (shouldUpdate) {
      this.notify()
    }
    return this.value
  }

  getValue(): T {
    if (activeObserver) {
      this.subscribe(activeObserver)
    }
    return this.value
  }
}

class ComputedObserver<T> implements Observer {
  name?: string
  private cell: ReactiveCell<T>
  private updateFn: UpdateFn<T>

  constructor(updateFn: UpdateFn<T>, initialValue?: T, equalFn?: EqualFn<T>, name?: string) {
    this.updateFn = updateFn
    this.name = name
    this.cell = new ReactiveCell<T>(initialValue as T, equalFn, name)
    this.update()
  }

  update(): void {
    const prevObserver = activeObserver
    activeObserver = this
    const newValue = this.updateFn(this.cell.value)
    activeObserver = prevObserver

    this.cell.setValue(newValue)
  }

  getValue(): T {
    if (activeObserver) {
      this.cell.subscribe(activeObserver)
    }
    return this.cell.value
  }
}

class CallbackObserver implements Observer {
  name?: string
  private updateFn: UpdateFn<any>
  private value: any
  private isActive = true

  constructor(updateFn: UpdateFn<any>, initialValue?: any, name?: string) {
    this.updateFn = updateFn
    this.value = initialValue
    this.name = name
    this.update()
  }

  update(): void {
    if (!this.isActive) return

    const prevObserver = activeObserver
    activeObserver = this
    this.value = this.updateFn(this.value)
    activeObserver = prevObserver
  }

  unsubscribe(): void {
    this.isActive = false
  }
}

function createInput<T>(
  value: T,
  equal?: boolean | EqualFn<T>,
  options?: Options
): InputPair<T> {
  let equalFn: EqualFn<T> | undefined
  if (equal === true) {
    equalFn = (a, b) => a === b
  } else if (typeof equal === 'function') {
    equalFn = equal
  }

  const cell = new ReactiveCell<T>(value, equalFn, options?.name)

  const read: GetterFn<T> = () => cell.getValue()
  const write: SetterFn<T> = (nextValue) => cell.setValue(nextValue)

  return [read, write]
}

function createComputed<T>(
  updateFn: UpdateFn<T>,
  value?: T,
  equal?: boolean | EqualFn<T>,
  options?: { name?: string }
): GetterFn<T> {
  let equalFn: EqualFn<T> | undefined
  if (equal === true) {
    equalFn = (a, b) => a === b
  } else if (typeof equal === 'function') {
    equalFn = equal
  }

  const observer = new ComputedObserver<T>(updateFn, value, equalFn, options?.name)
  return () => observer.getValue()
}

function createCallback<T>(updateFn: UpdateFn<T>, value?: T): UnsubscribeFn {
  const observer = new CallbackObserver(updateFn, value)
  return () => observer.unsubscribe()
}

export { createInput, createComputed, createCallback }
