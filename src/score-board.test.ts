import { describe, expect, it } from 'vitest'
import { GameAlreadyInScoreboardException, GameDoesNotExist } from "./exceptions"
import { Game, ScoreBoard, Team } from "./score-board"
import { ScoreBoardInMemory } from "./score-board-in-memory"

describe("Scoreboard library", () => {
    describe("Happy path", () => {
        const scoreBoard: ScoreBoard = new ScoreBoardInMemory()
        const homeTeam: Team = "TeamA"
        const awayTeam: Team = "TeamB"

        it("allows to add new game, update its score, check it on the scoreboard and eventually finish it", () => {
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
                scoreBoard.updateGame(homeTeam, awayTeam, 1, 0)

            }).toThrow(new GameDoesNotExist())
        })

        it.todo("Disallows to set a lower score for existing game")
    })

    describe("Finishing game", () => {
        it.todo("Disallows to finish the non-existing game")
    })

    describe("Game summary", () => {
        it.todo("Returns an empty array if no games are in progress")
        it.todo("Returns games in progress ordered by the total score and add time")
    })
})