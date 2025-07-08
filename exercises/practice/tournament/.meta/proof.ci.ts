export class Tournament {
  // eslint-disable-next-line no-unused-vars
  public tally(input: string): string {
    const teams: { [name: string]: { wins: number; draws: number; losses: number } } = {}
    
    const lines = input.trim().split('\n').filter(line => line.trim())
    
    for (const line of lines) {
      const [team1, team2, result] = line.split(';')
      
      if (!teams[team1]) teams[team1] = { wins: 0, draws: 0, losses: 0 }
      if (!teams[team2]) teams[team2] = { wins: 0, draws: 0, losses: 0 }
      
      if (result === 'win') {
        teams[team1].wins++
        teams[team2].losses++
      } else if (result === 'loss') {
        teams[team1].losses++
        teams[team2].wins++
      } else if (result === 'draw') {
        teams[team1].draws++
        teams[team2].draws++
      }
    }
    
    const results = Object.entries(teams).map(([name, stats]) => ({
      name,
      matches: stats.wins + stats.draws + stats.losses,
      wins: stats.wins,
      draws: stats.draws,
      losses: stats.losses,
      points: stats.wins * 3 + stats.draws
    }))
    
    results.sort((a, b) => b.points - a.points || a.name.localeCompare(b.name))
    
    const header = 'Team                           | MP |  W |  D |  L |  P'
    const rows = results.map(team => 
      `${team.name.padEnd(31)}|${team.matches.toString().padStart(3)} |${team.wins.toString().padStart(3)} |${team.draws.toString().padStart(3)} |${team.losses.toString().padStart(3)} |${team.points.toString().padStart(3)}`
    )
    
    return [header, ...rows].join('\n')
  }
}
