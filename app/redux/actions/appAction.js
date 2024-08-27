
export const setTheme = (data) => (dispatch) => {
  storeAppTheme(data.selectedTheme);
  dispatch({
    type: types.SET_THEME,
    payload: data,
  });
};
