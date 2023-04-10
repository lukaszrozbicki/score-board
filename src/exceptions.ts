import { messages } from "./consts"

export class GameAlreadyInScoreboardException extends Error {
    message = messages.gameAlreadyInScoreboardMessage
}

export class GameDoesNotExist extends Error {
    message = messages.gameDoesNotExist
}