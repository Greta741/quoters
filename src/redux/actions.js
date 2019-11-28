export const SELECT_BOARD = 'SELECT_BOARD';
export const SET_VIEW = 'SET_VIEW';

export const selectRoom = board => {
  return {
    type: SELECT_BOARD,
    board
  };
};

export const setView = view => {
  return {
    type: SET_VIEW,
    view
  };
};
