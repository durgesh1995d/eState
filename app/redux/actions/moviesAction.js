import * as types from '../types';

export const likeMovies = (data) => (dispatch) => {
  dispatch({
    type: types.SET_LIKE_MOVIES,
    payload: {...data, like: true},
  });
};
export const disLikeMovies = (data) => (dispatch) => {
  dispatch({
    type: types.SET_DISLIKE_MOVIES,
    payload: data?.id,
  });
};
