export type Team = string

export interface Game {
    awayTeam: Team
    awayTeamScore: number
    homeTeam: Team
    homeTeamScore: number
}

export interface ScoreBoard {
    addGame(homeTeam: Team, awayTeam: Team): void
    updateGame(homeTeam: Team, awayTeam: Team, homeTeamScore: number, awayTeamScore: number, force?: boolean): void
    finishGame(homeTeam: Team, awayTeam: Team)
    getGameSummary(): Game[]
}