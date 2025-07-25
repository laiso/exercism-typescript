export function degreesOfSeparation(
  familyTree: Record<string, string[]>,
  personA: string,
  personB: string
): number {
  if (personA === personB) return 0
  
  // Build bidirectional graph
  const graph: Record<string, string[]> = {}
  
  // Add all people to graph
  const allPeople = new Set<string>()
  for (const [parent, children] of Object.entries(familyTree)) {
    allPeople.add(parent)
    for (const child of children) {
      allPeople.add(child)
    }
  }
  
  // Initialize graph
  for (const person of allPeople) {
    graph[person] = []
  }
  
  // Add parent-child and sibling relationships
  for (const [parent, children] of Object.entries(familyTree)) {
    // Parent-child relationships
    for (const child of children) {
      graph[parent].push(child)
      graph[child].push(parent)
    }
    
    // Sibling relationships
    for (let i = 0; i < children.length; i++) {
      for (let j = i + 1; j < children.length; j++) {
        graph[children[i]].push(children[j])
        graph[children[j]].push(children[i])
      }
    }
  }
  
  // BFS to find shortest path
  const queue = [personA]
  const visited = new Set([personA])
  const distances: Record<string, number> = { [personA]: 0 }
  
  while (queue.length > 0) {
    const current = queue.shift()!
    
    if (current === personB) {
      return distances[current]
    }
    
    for (const neighbor of graph[current] || []) {
      if (!visited.has(neighbor)) {
        visited.add(neighbor)
        distances[neighbor] = distances[current] + 1
        queue.push(neighbor)
      }
    }
  }
  
  return -1  // Not connected
}
