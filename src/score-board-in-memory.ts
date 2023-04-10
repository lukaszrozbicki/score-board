import { Game, ScoreBoard, Team } from "./score-board"

export class ScoreBoardInMemory implements ScoreBoard {
    private games: Game[]

    addGame(homeTeam: Team, awayTeam:Team): void {
    }

    getGameSummary(): Game[] {
        return []
    }

    finishGame(homeTeam: Team, awayTeam: Team) {
    }

    updateGame(homeTeam: Team, awayTeam: Team, homeTeamScore: number, awayTeamScore: number): void {
    }
}