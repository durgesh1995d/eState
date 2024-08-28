import * as types from '../types';

export const fetchData = (data) => (dispatch) => {
  dispatch({
    type: types.SET_FETCH,
    payload: data,
  });
};

export const emptyData = () => (dispatch) => {
  console.log('Empty =Action==');
  dispatch({
    type: types.SET_EMPTY,
    payload: [],
  });
};
