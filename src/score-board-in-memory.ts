import { GameAlreadyInScoreboardException, GameDoesNotExist } from "./exceptions"
import { Game, ScoreBoard, Team } from "./score-board"

export class ScoreBoardInMemory implements ScoreBoard {
    private games: Game[] = []

    private findGameIndex(homeTeam: Team, awayTeam: Team): number {
        return this.games.findIndex((game) => {
            return game.homeTeam === homeTeam && game.awayTeam === awayTeam
        })
    }

    private updateGameOnIndex(gameIndex: number, game?: Game): void {
        const newGames = [...this.games]

        if (game) {
            newGames.splice(gameIndex, 1, game)
        } else {
            newGames.splice(gameIndex, 1)
        }

        this.games = newGames
    }

    addGame(homeTeam: Team, awayTeam: Team): void {
        const gameIndex = this.findGameIndex(homeTeam, awayTeam)
        const mismatchedGameIndex = this.findGameIndex(awayTeam, homeTeam)

        if (gameIndex > -1 || mismatchedGameIndex > -1) {
            throw new GameAlreadyInScoreboardException()
        }

        this.games.push({
            awayTeam,
            awayTeamScore: 0,
            homeTeam,
            homeTeamScore: 0,
        })
    }

    getGameSummary(): Game[] {
        return this.games
    }

    updateGame(homeTeam: Team, awayTeam: Team, homeTeamScore: number, awayTeamScore: number): void {
        const gameToUpdateIndex = this.findGameIndex(homeTeam, awayTeam)

        if (gameToUpdateIndex === -1) {
            throw new GameDoesNotExist()
        }

        this.updateGameOnIndex(gameToUpdateIndex, {
            awayTeam,
            awayTeamScore,
            homeTeam,
            homeTeamScore,
        })
    }

    finishGame(homeTeam: Team, awayTeam: Team) {
        const gameToUpdateIndex = this.findGameIndex(homeTeam, awayTeam)

        if (gameToUpdateIndex === -1) {
            return
        }

        this.updateGameOnIndex(gameToUpdateIndex)
    }
}