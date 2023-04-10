import { describe, it } from 'vitest'

describe("Scoreboard library", () => {
    describe("Happy path", () => {
        it.todo("allows to add new game, update its score, check it on the scoreboard and eventually finish it")
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