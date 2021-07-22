import {combineReducers} from 'redux';
import FavouriteReducer from './FavouriteReducer';

const rootReducer = combineReducers({
  FavouriteReducer: FavouriteReducer,
});

export default rootReducer;
