export const SELECT_BOARD = 'SELECT_BOARD';
export const LOAD_BOARDS = 'LOAD_BOARDS';
export const LOAD_QUOTES = 'LOAD_QUOTES';

export const selectRoom = board => {
  return {
    type: SELECT_BOARD,
    board
  };
};

export const loadBoards = boards => {
  return {
    type: LOAD_BOARDS,
    boards
  };
};

export const loadQuotes = quotes => {
  return {
    type: LOAD_QUOTES,
    quotes
  };
};
