import { HighScoresType } from "../../types/HighScoresType"
import { HIGHSCORES_CLEAR, HIGHSCORES_LOAD } from "../types/highScoresEventTypes"

export const clearHighScores = () => {
    return {
        type: HIGHSCORES_CLEAR
    }
}

export const loadHighScores = (highScores: HighScoresType) => {
    return {
        type: HIGHSCORES_LOAD,
        payload: highScores
    }
}