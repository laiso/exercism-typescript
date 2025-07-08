export class TwoBucket {
  private bucketOneCapacity: number
  private bucketTwoCapacity: number
  private goal: number
  private starterBucket: string
  private moveCount: number
  private goalBucketName: string
  private otherBucketAmount: number

  constructor(bucketOne: number, bucketTwo: number, goal: number, starterBucket: string) {
    this.bucketOneCapacity = bucketOne
    this.bucketTwoCapacity = bucketTwo
    this.goal = goal
    this.starterBucket = starterBucket
    this.moveCount = 0
    this.goalBucketName = ''
    this.otherBucketAmount = 0
    
    this.solve()
  }

  private solve(): void {
    const visited = new Set<string>()
    const queue: Array<{
      bucket1: number
      bucket2: number
      moves: number
      lastAction: string
    }> = []

    const startState = this.starterBucket === 'one' 
      ? { bucket1: this.bucketOneCapacity, bucket2: 0, moves: 1, lastAction: 'fill1' }
      : { bucket1: 0, bucket2: this.bucketTwoCapacity, moves: 1, lastAction: 'fill2' }

    queue.push(startState)

    while (queue.length > 0) {
      const current = queue.shift()!
      const stateKey = `${current.bucket1},${current.bucket2}`

      if (visited.has(stateKey)) continue
      visited.add(stateKey)

      if (current.bucket1 === this.goal) {
        this.moveCount = current.moves
        this.goalBucketName = 'one'
        this.otherBucketAmount = current.bucket2
        return
      }

      if (current.bucket2 === this.goal) {
        this.moveCount = current.moves
        this.goalBucketName = 'two'
        this.otherBucketAmount = current.bucket1
        return
      }

      const nextStates = [
        { bucket1: this.bucketOneCapacity, bucket2: current.bucket2, moves: current.moves + 1, lastAction: 'fill1' },
        { bucket1: current.bucket1, bucket2: this.bucketTwoCapacity, moves: current.moves + 1, lastAction: 'fill2' },
        { bucket1: 0, bucket2: current.bucket2, moves: current.moves + 1, lastAction: 'empty1' },
        { bucket1: current.bucket1, bucket2: 0, moves: current.moves + 1, lastAction: 'empty2' }
      ]

      const pour1to2 = Math.min(current.bucket1, this.bucketTwoCapacity - current.bucket2)
      nextStates.push({
        bucket1: current.bucket1 - pour1to2,
        bucket2: current.bucket2 + pour1to2,
        moves: current.moves + 1,
        lastAction: 'pour1to2'
      })

      const pour2to1 = Math.min(current.bucket2, this.bucketOneCapacity - current.bucket1)
      nextStates.push({
        bucket1: current.bucket1 + pour2to1,
        bucket2: current.bucket2 - pour2to1,
        moves: current.moves + 1,
        lastAction: 'pour2to1'
      })

      for (const nextState of nextStates) {
        const nextKey = `${nextState.bucket1},${nextState.bucket2}`
        if (!visited.has(nextKey)) {
          if (this.starterBucket === 'one' && nextState.lastAction === 'fill2' && current.moves === 0) continue
          if (this.starterBucket === 'two' && nextState.lastAction === 'fill1' && current.moves === 0) continue
          queue.push(nextState)
        }
      }
    }
  }

  moves(): number {
    return this.moveCount
  }

  get goalBucket(): string {
    return this.goalBucketName
  }

  get otherBucket(): number {
    return this.otherBucketAmount
  }
}
