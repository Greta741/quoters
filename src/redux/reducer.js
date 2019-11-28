import {
  LOAD_BOARDS,
  LOAD_QUOTES,
} from './actions.js';
import {DISABLE_CENSOR} from "./actions";

const INITIAL_STATE = {
  quotes: [],
  boards: [],
  disableCensor: false,
};

export const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
      case LOAD_BOARDS:
      return {
        ...state,
        boards: action.boards
      };
      case LOAD_QUOTES:
      return {
        ...state,
        quotes: action.quotes
      };
      case DISABLE_CENSOR:
      return {
        ...state,
        disableCensor: true
      };
    default:
      return state;
  }
};

export const getQuotesSelector = state => {
  return state.quotes.filter(quote => {
    if (state.disableCensor) {
      return quote;
    }
    if (!quote.censor) {
      return quote;
    }
  });
};

const getSelectedBoardSelector = state => state.selectedBoard;
