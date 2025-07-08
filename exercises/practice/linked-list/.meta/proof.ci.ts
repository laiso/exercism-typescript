export class LinkedList<TElement> {
  private head: Node<TElement> | null = null
  private tail: Node<TElement> | null = null
  private size: number = 0

  public push(element: TElement): void {
    const newNode = new Node(element)
    if (!this.tail) {
      this.head = this.tail = newNode
    } else {
      this.tail.next = newNode
      newNode.prev = this.tail
      this.tail = newNode
    }
    this.size++
  }

  public pop(): TElement {
    if (!this.tail) {
      throw new Error('List is empty')
    }
    const element = this.tail.value
    if (this.tail.prev) {
      this.tail.prev.next = null
      this.tail = this.tail.prev
    } else {
      this.head = this.tail = null
    }
    this.size--
    return element
  }

  public shift(): TElement {
    if (!this.head) {
      throw new Error('List is empty')
    }
    const element = this.head.value
    if (this.head.next) {
      this.head.next.prev = null
      this.head = this.head.next
    } else {
      this.head = this.tail = null
    }
    this.size--
    return element
  }

  public unshift(element: TElement): void {
    const newNode = new Node(element)
    if (!this.head) {
      this.head = this.tail = newNode
    } else {
      this.head.prev = newNode
      newNode.next = this.head
      this.head = newNode
    }
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

class Node<T> {
  public value: T
  public next: Node<T> | null = null
  public prev: Node<T> | null = null

  constructor(value: T) {
    this.value = value
  }
}
