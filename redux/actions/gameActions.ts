import { CHANGE_TURN, GAME_RESET, GAME_START, INCREASE_SCORE, SET_NAME, TOGGLE_MODAL } from "../types/gameEventTypes"

export const startGame = () => {
    return {
        type: GAME_START
    }
}

export const increaseScore = () => {
    return {
        type: INCREASE_SCORE
    }
}

export const changeTurn = () => {
    return {
        type: CHANGE_TURN
    }
}

export const toggleModal = () => {
    return {
        type: TOGGLE_MODAL
    }
}

export const resetGame = () => {
    return {
        type: GAME_RESET
    }
}

export const setName = (name: string) => {
    return {
        type: SET_NAME,
        payload: name
    }
}