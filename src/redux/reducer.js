import { createSelector } from 'reselect';

import {
  SELECT_ROOM
} from './actions.js';


const INITIAL_STATE = {
  quotes: [
    {
      quote: 'Etiam quam ante, scelerisque id mollis sit amet, finibus ut enim. Suspendisse vel erat et risus sodales mattis. In eget magna aliquam, condimentum metus dignissim, maximus erat. ',
      author: 'Internet',
      room: '404'
    },
    {
      quote: 'Etiam quam ante, scelerisque id mollis sit amet, finibus ut enim. Suspendisse vel erat et risus sodales mattis. In eget magna aliquam, condimentum metus dignissim, maximus erat. ',
      author: 'Internet',
      room: '404'
    },
    {
      quote: 'Etiam quam ante, scelerisque id mollis sit amet, finibus ut enim. Suspendisse vel erat et risus sodales mattis. In eget magna aliquam, condimentum metus dignissim, maximus erat. ',
      author: 'Internet',
      room: '403'
    },
    {
      quote: 'Etiam quam ante, scelerisque id mollis sit amet, finibus ut enim. Suspendisse vel erat et risus sodales mattis. In eget magna aliquam, condimentum metus dignissim, maximus erat. ',
      author: 'Internet',
      room: '403'
    },
    {
      quote: 'Etiam quam ante, scelerisque id mollis sit amet, finibus ut enim. Suspendisse vel erat et risus sodales mattis. In eget magna aliquam, condimentum metus dignissim, maximus erat. ',
      author: 'Internet',
      room: '403'
    },
  ],
  rooms: ['404', '403'],
  selectedRoom: null,
};

export const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SELECT_ROOM:
      return {
        ...state,
        selectedRoom: action.room
      };
    default:
      return state;
  }
};

const getQuotesSelector = state => state.quotes;
const getSelectedRoomSelector = state => state.selectedRoom;

export const getVisibleQuotes = createSelector(
  getQuotesSelector,
  getSelectedRoomSelector,
  (quotes, selectedRoom) => {
    if (!selectedRoom) {
      return quotes
    }
    return quotes.filter(quote => quote.room === selectedRoom)
  }
);
