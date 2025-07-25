export default class CircularBuffer<T> {
  private buffer: (T | undefined)[]
  private capacity: number
  private readIndex: number = 0
  private writeIndex: number = 0
  private size: number = 0

  constructor(capacity: number) {
    this.capacity = capacity
    this.buffer = new Array(capacity)
  }

  write(value: T): void {
    if (this.size >= this.capacity) {
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
    
    const value = this.buffer[this.readIndex]!
    this.buffer[this.readIndex] = undefined
    this.readIndex = (this.readIndex + 1) % this.capacity
    this.size--
    
    return value
  }

  forceWrite(value: T): void {
    if (this.size >= this.capacity) {
      // Overwrite the oldest item
      this.buffer[this.writeIndex] = value
      this.writeIndex = (this.writeIndex + 1) % this.capacity
      this.readIndex = (this.readIndex + 1) % this.capacity
    } else {
      // Act like normal write
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
