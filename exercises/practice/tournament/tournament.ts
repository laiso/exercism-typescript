export class Tournament {
  // eslint-disable-next-line no-unused-vars
  public tally(input: string): string {
    const teams: { [key: string]: { wins: number; draws: number; losses: number } } = {}
    
    const lines = input.trim().split('\n')
    for (const line of lines) {
      if (line.trim() === '') continue
      
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
    
    const sortedTeams = Object.entries(teams)
      .map(([name, stats]) => ({
        name,
        matches: stats.wins + stats.draws + stats.losses,
        wins: stats.wins,
        draws: stats.draws,
        losses: stats.losses,
        points: stats.wins * 3 + stats.draws
      }))
      .sort((a, b) => {
        if (a.points !== b.points) return b.points - a.points
        return a.name.localeCompare(b.name)
      })
    
    let result = 'Team                           | MP |  W |  D |  L |  P\n'
    for (const team of sortedTeams) {
      const name = team.name.padEnd(30)
      const mp = team.matches.toString().padStart(2)
      const w = team.wins.toString().padStart(2)
      const d = team.draws.toString().padStart(2)
      const l = team.losses.toString().padStart(2)
      const p = team.points.toString().padStart(2)
      result += `${name} | ${mp} | ${w} | ${d} | ${l} | ${p}\n`
    }
    
    return result.trimEnd()
  }
}
