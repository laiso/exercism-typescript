export class TwoBucket {
  private bucketOne: number
  private bucketTwo: number
  private goal: number
  private startBucket: string
  private moveCount: number
  private goalBucketName: string
  private otherBucketAmount: number

  constructor(bucketOneSize: number, bucketTwoSize: number, goal: number, startBucket: string) {
    this.bucketOne = bucketOneSize
    this.bucketTwo = bucketTwoSize
    this.goal = goal
    this.startBucket = startBucket
    this.solve()
  }

  private solve() {
    const queue: Array<{
      bucket1: number,
      bucket2: number,
      moves: number,
      lastAction: string
    }> = []
    
    const visited = new Set<string>()
    
    if (this.startBucket === 'one') {
      queue.push({ bucket1: this.bucketOne, bucket2: 0, moves: 1, lastAction: 'fill1' })
    } else {
      queue.push({ bucket1: 0, bucket2: this.bucketTwo, moves: 1, lastAction: 'fill2' })
    }
    
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
      
      const nextStates = []
      
      if (current.bucket1 < this.bucketOne) {
        nextStates.push({ bucket1: this.bucketOne, bucket2: current.bucket2, moves: current.moves + 1, lastAction: 'fill1' })
      }
      
      if (current.bucket2 < this.bucketTwo) {
        nextStates.push({ bucket1: current.bucket1, bucket2: this.bucketTwo, moves: current.moves + 1, lastAction: 'fill2' })
      }
      
      if (current.bucket1 > 0) {
        nextStates.push({ bucket1: 0, bucket2: current.bucket2, moves: current.moves + 1, lastAction: 'empty1' })
      }
      
      if (current.bucket2 > 0) {
        nextStates.push({ bucket1: current.bucket1, bucket2: 0, moves: current.moves + 1, lastAction: 'empty2' })
      }
      
      if (current.bucket1 > 0 && current.bucket2 < this.bucketTwo) {
        const pour = Math.min(current.bucket1, this.bucketTwo - current.bucket2)
        nextStates.push({ 
          bucket1: current.bucket1 - pour, 
          bucket2: current.bucket2 + pour, 
          moves: current.moves + 1, 
          lastAction: 'pour1to2' 
        })
      }
      
      if (current.bucket2 > 0 && current.bucket1 < this.bucketOne) {
        const pour = Math.min(current.bucket2, this.bucketOne - current.bucket1)
        nextStates.push({ 
          bucket1: current.bucket1 + pour, 
          bucket2: current.bucket2 - pour, 
          moves: current.moves + 1, 
          lastAction: 'pour2to1' 
        })
      }
      
      for (const state of nextStates) {
        const key = `${state.bucket1},${state.bucket2}`
        if (!visited.has(key)) {
          queue.push(state)
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
