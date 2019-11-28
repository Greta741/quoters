export const LOAD_BOARDS = 'LOAD_BOARDS';
export const LOAD_QUOTES = 'LOAD_QUOTES';
export const DISABLE_CENSOR = 'DISABLE_CENSOR';

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

export const disableCensor = () => {
  return {
    type: DISABLE_CENSOR,
  };
};
