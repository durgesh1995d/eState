import * as types from '../types';

const init_state = {
  likeMoviesData: [],
};

const MoviesReducer = (state = init_state, action) => {
  console.log();
  switch (action.type) {
    case types.SET_LIKE_MOVIES: {
      return {
        likeMoviesData: [...state.likeMoviesData, action.payload],
      };
    }
    case types.SET_DISLIKE_MOVIES: {
      return {
        likeMoviesData:
          state.likeMoviesData?.length > 0 &&
          state.likeMoviesData?.filter((e) => e.id != action.payload),
      };
    }
  }
  return state;
};

export default MoviesReducer;
