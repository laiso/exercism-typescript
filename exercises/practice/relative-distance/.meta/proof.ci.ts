export function degreesOfSeparation(
  familyTree: string[][],
  personA: string,
  personB: string
): number {
  if (personA === personB) return 0
  
  const graph = new Map<string, string[]>()
  
  for (const [parent, child] of familyTree) {
    if (!graph.has(parent)) graph.set(parent, [])
    if (!graph.has(child)) graph.set(child, [])
    graph.get(parent)!.push(child)
    graph.get(child)!.push(parent)
  }
  
  const queue: [string, number][] = [[personA, 0]]
  const visited = new Set<string>([personA])
  
  while (queue.length > 0) {
    const [current, distance] = queue.shift()!
    
    if (current === personB) return distance
    
    const neighbors = graph.get(current) || []
    for (const neighbor of neighbors) {
      if (!visited.has(neighbor)) {
        visited.add(neighbor)
        queue.push([neighbor, distance + 1])
      }
    }
  }
  
  return -1
}
