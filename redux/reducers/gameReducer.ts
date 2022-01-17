import { GameState } from "../../types/GameState";
import { CHANGE_TURN, GAME_RESET, GAME_START, INCREASE_SCORE, SET_NAME, TOGGLE_MODAL } from "../types/gameEventTypes";


const initialState: GameState = {
    isStarted: false,
    score: 0,
    isSimonTurn: true,
    isModalOpen: false,
    playerName: ''
};

interface Action {
    type: string;
    payload?: any;
}

export const gameReducer = (previousState = initialState, action: Action): GameState => {
    switch(action.type) {
        case GAME_START: return {...previousState, isStarted: true};
        case INCREASE_SCORE: return {...previousState, score: previousState.score + 1};
        case CHANGE_TURN: return {...previousState, isSimonTurn: !previousState.isSimonTurn};
        case TOGGLE_MODAL: return {...previousState, isModalOpen: !previousState.isModalOpen};
        case SET_NAME: return {...previousState, playerName: action.payload};
        case GAME_RESET: return initialState;
        default: return previousState;
    }
}