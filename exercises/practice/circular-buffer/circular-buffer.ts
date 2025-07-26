export default class CircularBuffer<T> {
  private buffer: (T | undefined)[]
  private readIndex: number = 0
  private writeIndex: number = 0
  private size: number = 0
  private capacity: number

  constructor(capacity: number) {
    this.capacity = capacity
    this.buffer = new Array(capacity)
  }

  write(value: T): void {
    if (this.size === this.capacity) {
      throw new BufferFullError()
    }
    
    this.buffer[this.writeIndex] = value
    this.writeIndex = (this.writeIndex + 1) % this.capacity
    this.size++
  }

  read(): T {
    if (this.size === 0) {
      throw new BufferEmptyError()
    }
    
    const value = this.buffer[this.readIndex]
    this.buffer[this.readIndex] = undefined
    this.readIndex = (this.readIndex + 1) % this.capacity
    this.size--
    
    return value!
  }

  forceWrite(value: T): void {
    if (this.size === this.capacity) {
      // Buffer is full, overwrite oldest element
      this.buffer[this.readIndex] = value
      this.readIndex = (this.readIndex + 1) % this.capacity
    } else {
      // Buffer has space, use normal write
      this.write(value)
    }
  }

  clear(): void {
    this.buffer = new Array(this.capacity)
    this.readIndex = 0
    this.writeIndex = 0
    this.size = 0
  }
}

export class BufferFullError extends Error {
  constructor() {
    super('Buffer is full')
  }
}

export class BufferEmptyError extends Error {
  constructor() {
    super('Buffer is empty')
  }
}
