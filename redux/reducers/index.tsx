import {combineReducers} from 'redux';
import {gameReducer} from './gameReducer';
import {highScoreReducer} from './highScoresReducer';

export const rootReducer = combineReducers({
  highscores: highScoreReducer,
  gameState: gameReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
