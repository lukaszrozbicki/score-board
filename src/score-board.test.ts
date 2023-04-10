import { describe, expect, it } from 'vitest'
import {
    GameAlreadyInScoreboardException,
    GameDoesNotExistException,
    NegativeScoreValueException,
    NewGameScoreIsLowerThanCurrentException
} from "./exceptions"
import { Game, ScoreBoard, Team } from "./score-board"
import { ScoreBoardInMemory } from "./score-board-in-memory"

const homeTeam: Team = "TeamA"
const awayTeam: Team = "TeamB"

describe("Scoreboard library", () => {
    describe("Happy path", () => {
        const scoreBoard: ScoreBoard = new ScoreBoardInMemory()

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
        const scoreBoard: ScoreBoard = new ScoreBoardInMemory()

        it("Disallows to finish the non-existing game", () => {
            expect(() => {
                scoreBoard.finishGame(homeTeam, awayTeam)
            }).toThrow(new GameDoesNotExistException())
        })
    })

    describe("Game summary", () => {
        const scoreBoard: ScoreBoard = new ScoreBoardInMemory()

        it("Returns an empty array if no games are in progress", () => {
            expect(scoreBoard.getGameSummary()).toEqual([])
        })

        it("Returns games in progress ordered by the total score and add time", () => {
            scoreBoard.addGame("Mexico", "Canada")
            scoreBoard.addGame("Spain", "Brazil")
            scoreBoard.addGame("Germany", "France")
            scoreBoard.addGame("Uruguay", "Italy")
            scoreBoard.addGame("Argentina", "Australia")
            scoreBoard.updateGame("Mexico", "Canada", 0, 5)
            scoreBoard.updateGame("Spain", "Brazil", 10, 2)
            scoreBoard.updateGame("Germany", "France", 2, 2)
            scoreBoard.updateGame("Uruguay", "Italy", 6, 6)
            scoreBoard.updateGame("Argentina", "Australia", 3, 1)

            const expectedGameSummary: Game[] = [
                { awayTeam: "Italy", awayTeamScore: 6, homeTeam: "Uruguay", homeTeamScore: 6 },
                { awayTeam: "Brazil", awayTeamScore: 2, homeTeam: "Spain", homeTeamScore: 10 },
                { awayTeam: "Canada", awayTeamScore: 5, homeTeam: "Mexico", homeTeamScore: 0 },
                { awayTeam: "Australia", awayTeamScore: 1, homeTeam: "Argentina", homeTeamScore: 3 },
                { awayTeam: "France", awayTeamScore: 2, homeTeam: "Germany", homeTeamScore: 2 },
            ]

            expect(scoreBoard.getGameSummary()).toEqual(expectedGameSummary)
        })
    })
})