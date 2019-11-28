export const SELECT_BOARD = 'SELECT_BOARD';

export const selectRoom = board => {
  return {
    type: SELECT_BOARD,
    board
  };
};
