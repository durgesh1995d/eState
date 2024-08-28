import * as types from '../types';

const init_state = {
  showModal: false,
  data: [],
};

const appReducer = (state = init_state, action) => {
  switch (action.type) {
    case types.SET_FETCH: {
      return {
        data: action.payload,
      };
    }
    case types.SET_EMPTY: {
      return {
        data: action.payload,
      };
    }
  }
  return state;
};

export default appReducer;
