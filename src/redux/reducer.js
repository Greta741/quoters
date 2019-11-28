import { createSelector } from 'reselect';

import {
  SELECT_BOARD,
  LOAD_BOARDS,
  LOAD_QUOTES,
} from './actions.js';

const INITIAL_STATE = {
  quotes: [
    {
      quote: 'Etiam quam ante, scelerisque id mollis sit amet, finibus ut enim. Suspendisse vel erat et risus sodales mattis. In eget magna aliquam, condimentum metus dignissim, maximus erat. ',
      author: 'Internet',
      board: '404'
    },
    {
      quote: 'Etiam quam ante, scelerisque id mollis sit amet, finibus ut enim. Suspendisse vel erat et risus sodales mattis. In eget magna aliquam, condimentum metus dignissim, maximus erat. ',
      author: 'Internet',
      board: '404'
    },
    {
      quote: 'Etiam quam ante, scelerisque id mollis sit amet, finibus ut enim. Suspendisse vel erat et risus sodales mattis. In eget magna aliquam, condimentum metus dignissim, maximus erat. ',
      author: 'Internet',
      board: '403'
    },
    {
      quote: 'Etiam quam ante, scelerisque id mollis sit amet, finibus ut enim. Suspendisse vel erat et risus sodales mattis. In eget magna aliquam, condimentum metus dignissim, maximus erat. ',
      author: 'Internet',
      board: '403'
    },
    {
      quote: 'Etiam quam ante, scelerisque id mollis sit amet, finibus ut enim. Suspendisse vel erat et risus sodales mattis. In eget magna aliquam, condimentum metus dignissim, maximus erat. ',
      author: 'Internet',
      board: '403'
    },
  ],
  boards: ['404', '403'],
  selectedRoom: null,
  view: 'quote'
};

export const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SELECT_BOARD:
      return {
        ...state,
        selectedBoard: action.board
      };
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
    default:
      return state;
  }
};

const getQuotesSelector = state => state.quotes;
const getSelectedBoardSelector = state => state.selectedBoard;

export const getVisibleQuotes = createSelector(
  getQuotesSelector,
  getSelectedBoardSelector,
  (quotes, selectedBoard) => {
    if (!selectedBoard) {
      return quotes
    }
    return quotes.filter(quote => quote.board === selectedBoard)
  }
);
