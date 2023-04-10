import { messages } from "./consts"

export class GameAlreadyInScoreboardException extends Error {
    message = messages.gameAlreadyInScoreboardMessage
}