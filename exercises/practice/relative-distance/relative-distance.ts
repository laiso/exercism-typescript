export function degreesOfSeparation(
  familyTree: Record<string, string[]>,
  personA: string,
  personB: string
): number {
  if (personA === personB) return 0
  
  const visited = new Set<string>()
  const queue: [string, number][] = [[personA, 0]]
  
  const allPeople = new Set<string>()
  for (const parent in familyTree) {
    allPeople.add(parent)
    for (const child of familyTree[parent]) {
      allPeople.add(child)
    }
  }
  
  const connections: Record<string, string[]> = {}
  for (const person of allPeople) {
    connections[person] = []
  }
  
  for (const parent in familyTree) {
    const children = familyTree[parent]
    
    for (const child of children) {
      connections[parent].push(child)
      connections[child].push(parent)
    }
    
    for (let i = 0; i < children.length; i++) {
      for (let j = i + 1; j < children.length; j++) {
        connections[children[i]].push(children[j])
        connections[children[j]].push(children[i])
      }
    }
  }
  
  while (queue.length > 0) {
    const [current, distance] = queue.shift()!
    
    if (visited.has(current)) continue
    visited.add(current)
    
    const relatives = connections[current] || []
    
    for (const relative of relatives) {
      if (relative === personB) {
        return distance + 1
      }
      
      if (!visited.has(relative)) {
        queue.push([relative, distance + 1])
      }
    }
  }
  
  return -1
}
