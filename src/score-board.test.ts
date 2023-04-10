import { describe, expect, it } from 'vitest'
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
        it.todo("Disallows to add a new game with same teams as are already added")
    })

    describe("Updating score", () => {
        it.todo("Updates the score of the game currently in progress")
        it.todo("Disallows to update a score for non-existing game")
        it.todo("Disallows to set a lower score for existing game")
    })

    describe("Finishing game", () => {
        it.todo("Finishes the specified game in progress")
        it.todo("Disallows to finish the non-existing game")
    })

    describe("Game summary", () => {
        it.todo("Returns an empty array if no games are in progress")
        it.todo("Returns games in progress ordered by the total score and add time")
    })
})