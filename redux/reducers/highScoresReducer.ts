import { HighScoresType } from "../../types/HighScoresType";
import { HIGHSCORES_CLEAR, HIGHSCORES_LOAD } from "../types/highScoresEventTypes"

const initialState: HighScoresType = [];

interface Action {
    type: string;
    payload?: HighScoresType;
}

export const highScoreReducer = (previousState: HighScoresType = initialState, action: Action) => {
    switch(action.type) {
        case HIGHSCORES_CLEAR: return [];
        case HIGHSCORES_LOAD: return action.payload;
        default: return previousState;
    }
}