import {combineReducers} from 'redux';
import appReducer from './appReducer';
import MoviesReducer from './moviesReducer';

const combinedReducer = combineReducers({
  app: appReducer,
  movies: MoviesReducer,
});

const rootReducer = (state, action) => {
  return combinedReducer(state, action);
};

export default rootReducer;
