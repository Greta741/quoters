import { createSelector } from 'reselect';

import {
  SELECT_BOARD,
  SET_VIEW,
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
    case SET_VIEW:
      return {
        ...state,
        view: action.view
      };
    default:
      return state;
  }
};

const getQuotesSelector = state => state.quotes;
const getSelectedBoardSelector = state => state.selectedBoard;
export const getSetView = state => state.view;

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
