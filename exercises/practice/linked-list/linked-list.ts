interface Node<T> {
  value: T
  next: Node<T> | null
  prev: Node<T> | null
}

export class LinkedList<TElement> {
  private head: Node<TElement> | null = null
  private tail: Node<TElement> | null = null
  private size: number = 0

  public push(element: TElement): void {
    const newNode: Node<TElement> = {
      value: element,
      next: null,
      prev: this.tail
    }

    if (this.tail) {
      this.tail.next = newNode
    } else {
      this.head = newNode
    }

    this.tail = newNode
    this.size++
  }

  public pop(): TElement {
    if (!this.tail) {
      throw new Error('List is empty')
    }

    const value = this.tail.value
    
    if (this.tail.prev) {
      this.tail.prev.next = null
      this.tail = this.tail.prev
    } else {
      this.head = null
      this.tail = null
    }

    this.size--
    return value
  }

  public shift(): TElement {
    if (!this.head) {
      throw new Error('List is empty')
    }

    const value = this.head.value

    if (this.head.next) {
      this.head.next.prev = null
      this.head = this.head.next
    } else {
      this.head = null
      this.tail = null
    }

    this.size--
    return value
  }

  public unshift(element: TElement): void {
    const newNode: Node<TElement> = {
      value: element,
      next: this.head,
      prev: null
    }

    if (this.head) {
      this.head.prev = newNode
    } else {
      this.tail = newNode
    }

    this.head = newNode
    this.size++
  }

  public delete(element: TElement): void {
    let current = this.head

    while (current) {
      if (current.value === element) {
        if (current.prev) {
          current.prev.next = current.next
        } else {
          this.head = current.next
        }

        if (current.next) {
          current.next.prev = current.prev
        } else {
          this.tail = current.prev
        }

        this.size--
        return
      }
      current = current.next
    }
  }

  public count(): number {
    return this.size
  }
}
