import { combineReducers } from 'redux';
import {playerReducer, dungeonReducer} from './reducers';

export default combineReducers({
  playerReducer,
  dungeonReducer
});
