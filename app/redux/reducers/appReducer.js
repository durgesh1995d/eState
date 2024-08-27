import * as types from '../types';

const init_state = {
  showModal: false,
  loading: false,
  modalPayload: {},
  environment: 'dev',
  themeType: 'aqaar',
  theme: {},
  language: 'en',
};

const appReducer = (state = init_state, action) => {
  switch (action.type) {
    case types.SET_THEME: {
      return {
        ...state,
        themeType: action.payload.selectedTheme,
        theme: action.payload.theme,
      };
    }
  }
  return state;
};

export default appReducer;
