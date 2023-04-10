import { describe, expect, it } from 'vitest'
import {
    GameAlreadyInScoreboardException,
    GameDoesNotExistException,
    NegativeScoreValueException,
    NewGameScoreIsLowerThanCurrentException
} from "./exceptions"
import { Game, ScoreBoard, Team } from "./score-board"
import { ScoreBoardInMemory } from "./score-board-in-memory"

describe("Scoreboard library", () => {
    describe("Happy path", () => {
        const scoreBoard: ScoreBoard = new ScoreBoardInMemory()
        const homeTeam: Team = "TeamA"
        const awayTeam: Team = "TeamB"

        it("Allows to add new game, update its score, check it on the scoreboard and eventually finish it", () => {
            scoreBoard.addGame(homeTeam, awayTeam)

            const expectedScoreboard: Game[] = [
                {
                    awayTeam,
                    awayTeamScore: 0,
                    homeTeam,
                    homeTeamScore: 0,
                }
            ]

            expect(scoreBoard.getGameSummary()).toEqual(expectedScoreboard)

            scoreBoard.updateGame(homeTeam, awayTeam, 1, 0)

            const expectedUpdatedScoreboard: Game[] = [
                {
                    awayTeam,
                    awayTeamScore: 0,
                    homeTeam,
                    homeTeamScore: 1,
                }
            ]

            expect(scoreBoard.getGameSummary()).toEqual(expectedUpdatedScoreboard)

            scoreBoard.finishGame(homeTeam, awayTeam)

            expect(scoreBoard.getGameSummary()).toEqual([])
        })
    })

    describe("Adding new game", () => {
        const scoreBoard: ScoreBoard = new ScoreBoardInMemory()
        const homeTeam: Team = "TeamA"
        const awayTeam: Team = "TeamB"

        it("Disallows to add a new game with same teams as are already added", () => {
            scoreBoard.addGame(homeTeam, awayTeam)

            expect(() => {
                scoreBoard.addGame(homeTeam, awayTeam)
            }).toThrow(new GameAlreadyInScoreboardException())

            expect(() => {
                scoreBoard.addGame(awayTeam, homeTeam)
            }).toThrow(new GameAlreadyInScoreboardException())
        })
    })

    describe("Updating score", () => {
        const scoreBoard: ScoreBoard = new ScoreBoardInMemory()
        const homeTeam: Team = "TeamA"
        const awayTeam: Team = "TeamB"

        it("Disallows to update a score for non-existing game", () => {
            expect(() => {
                scoreBoard.updateGame(homeTeam, awayTeam, 2, 1)

            }).toThrow(new GameDoesNotExistException())
        })

        it("Disallows to set negative value score", () => {
            scoreBoard.addGame(homeTeam, awayTeam)

            expect(() => {
                scoreBoard.updateGame(homeTeam, awayTeam, 1, -1)
            }).toThrow(new NegativeScoreValueException())
        })

        it("Disallows to set a lower score for existing game", () => {
            scoreBoard.updateGame(homeTeam, awayTeam, 2, 1)

            expect(() => {
                scoreBoard.updateGame(homeTeam, awayTeam, 2, 0)
            }).toThrow(new NewGameScoreIsLowerThanCurrentException())
        })

        it("Allows to set the lower score for existing game when forced", () => {
            scoreBoard.updateGame(homeTeam, awayTeam, 0, 0, true)

            const expectedUpdatedScoreboard: Game[] = [
                {
                    awayTeam,
                    awayTeamScore: 0,
                    homeTeam,
                    homeTeamScore: 0,
                }
            ]

            expect(scoreBoard.getGameSummary()).toEqual(expectedUpdatedScoreboard)
        })
    })

    describe("Finishing game", () => {
        it.todo("Disallows to finish the non-existing game")
    })

    describe("Game summary", () => {
        it.todo("Returns an empty array if no games are in progress")
        it.todo("Returns games in progress ordered by the total score and add time")
    })
})