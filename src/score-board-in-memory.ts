import {
    GameAlreadyInScoreboardException,
    GameDoesNotExistException,
    NegativeScoreValueException,
    NewGameScoreIsLowerThanCurrentException
} from "./exceptions"
import { Game, GameWithOrder, ScoreBoard, Team } from "./score-board"

export class ScoreBoardInMemory implements ScoreBoard {
    private games: GameWithOrder[] = []

    private findGameIndex(homeTeam: Team, awayTeam: Team): number {
        return this.games.findIndex((game) => {
            return game.homeTeam === homeTeam && game.awayTeam === awayTeam
        })
    }

    private updateGameOnIndex(gameIndex: number, game?: GameWithOrder): void {
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
            order: this.games.length,
        })
    }

    updateGame(
        homeTeam: Team,
        awayTeam: Team,
        homeTeamScore: number,
        awayTeamScore: number,
        force: boolean = false,
    ): void {
        const gameToUpdateIndex = this.findGameIndex(homeTeam, awayTeam)

        if (gameToUpdateIndex === -1) {
            throw new GameDoesNotExistException()
        }

        if (homeTeamScore < 0 || awayTeamScore < 0) {
            throw new NegativeScoreValueException()
        }

        if (!force && (
            this.games[gameToUpdateIndex].homeTeamScore > homeTeamScore
            || this.games[gameToUpdateIndex].awayTeamScore > awayTeamScore
        )) {
            throw new NewGameScoreIsLowerThanCurrentException()
        }

        this.updateGameOnIndex(gameToUpdateIndex, {
            awayTeam,
            awayTeamScore,
            homeTeam,
            homeTeamScore,
            order: this.games[gameToUpdateIndex].order,
        })
    }

    finishGame(homeTeam: Team, awayTeam: Team) {
        const gameToUpdateIndex = this.findGameIndex(homeTeam, awayTeam)

        if (gameToUpdateIndex === -1) {
            throw new GameDoesNotExistException()
        }

        this.updateGameOnIndex(gameToUpdateIndex)
    }

    getGameSummary(): Game[] {
        return this.games
            .sort((gameA, gameB) => {
                const gameATotalScore = gameA.homeTeamScore + gameA.awayTeamScore
                const gameBTotalScore = gameB.homeTeamScore + gameB.awayTeamScore

                if (gameATotalScore < gameBTotalScore) {
                    return 1
                }

                if (gameATotalScore > gameBTotalScore) {
                    return -1
                }

                if (gameA.order < gameB.order) {
                    return 1
                }

                if (gameA.order > gameB.order) {
                    return -1
                }

                return 0
            })
            .map<Game>(({ order: _, ...game }) => {
                return game
            })
    }
}