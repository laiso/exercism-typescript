interface TeamStats {
  name: string
  matchesPlayed: number
  wins: number
  draws: number
  losses: number
  points: number
}

export class Tournament {
  public tally(input: string): string {
    const teams = new Map<string, TeamStats>()

    // Process each match result
    const lines = input.trim() ? input.trim().split('\n') : []
    
    for (const line of lines) {
      const [team1, team2, result] = line.split(';')
      
      // Ensure both teams exist in the map
      if (!teams.has(team1)) {
        teams.set(team1, {
          name: team1,
          matchesPlayed: 0,
          wins: 0,
          draws: 0,
          losses: 0,
          points: 0
        })
      }
      
      if (!teams.has(team2)) {
        teams.set(team2, {
          name: team2,
          matchesPlayed: 0,
          wins: 0,
          draws: 0,
          losses: 0,
          points: 0
        })
      }

      const stats1 = teams.get(team1)!
      const stats2 = teams.get(team2)!

      // Update match counts
      stats1.matchesPlayed++
      stats2.matchesPlayed++

      // Update results based on outcome
      if (result === 'win') {
        stats1.wins++
        stats1.points += 3
        stats2.losses++
      } else if (result === 'loss') {
        stats1.losses++
        stats2.wins++
        stats2.points += 3
      } else if (result === 'draw') {
        stats1.draws++
        stats1.points += 1
        stats2.draws++
        stats2.points += 1
      }
    }

    // Sort teams by points (descending), then by name (ascending)
    const sortedTeams = Array.from(teams.values()).sort((a, b) => {
      if (a.points !== b.points) {
        return b.points - a.points // Points descending
      }
      return a.name.localeCompare(b.name) // Name ascending
    })

    // Generate the table
    const header = 'Team                           | MP |  W |  D |  L |  P'
    const rows = [header]

    for (const team of sortedTeams) {
      const name = team.name.padEnd(31)
      const mp = team.matchesPlayed.toString().padStart(2)
      const w = team.wins.toString().padStart(2)
      const d = team.draws.toString().padStart(2)
      const l = team.losses.toString().padStart(2)
      const p = team.points.toString().padStart(2)
      
      rows.push(`${name}|${mp} |${w} |${d} |${l} |${p}`)
    }

    return rows.join('\n')
  }
}
