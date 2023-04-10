import { messages } from "./consts"

export class GameAlreadyInScoreboardException extends Error {
    message = messages.gameAlreadyInScoreboardMessage
}

export class GameDoesNotExistException extends Error {
    message = messages.gameDoesNotExist
}

export class NewGameScoreIsLowerThanCurrentException extends Error {
    message = messages.newGameScoreIsLowerThanCurrent
}

export class NegativeScoreValueException extends Error {
    message = messages.noNegativeScoreValue
}