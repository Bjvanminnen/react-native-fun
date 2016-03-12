import {
  ADD_SYMBOL,
  RECEIVE_DATA,
  RECEIVE_BATCHED_DATA
} from './actions';

import _ from 'lodash';

const initialState = {
  symbols: ['MSFT', 'GE', 'JNJ', 'KO', 'PEP', 'MCD', 'PM', 'WM', 'BRK-B',
    'INTC', 'VOD', 'XOM', 'VIG', 'PG', 'F', 'AAPL', 'VZ', 'SPY'],
  quotes: {
    // MSFT: {
    //   date: price
    // }
  },  
  // TODO - might be that these also belong in quotes, and we instead store
  // purchase dates
  purchasePrices: {
    MSFT: 24.05,
    GE: 15.74,
    JNJ: 59.52,
    KO: 35.12,
    PEP: 67.09,
    MCD: 81.84,
    PM: 65.98,
    WM: 31.1,
    'BRK-B': 80.24,
    INTC: 23,
    VOD: 49.99,
    XOM: 86.27,
    VIG: 58.7,
    PG: 66.21,
    F: 12.05,
    AAPL: 63.85,
    VZ: 48.12,
    SPY: 190.10, // 174.81
  }
};

function receiveData(state, {symbol, price, date}) {
  return {
    ...state,
    quotes: {
      ...state.quotes,
      [symbol]: {
        ...state.quotes[symbol],
        [date]: price
      }
    }
  };
}

export default function reducer(state = initialState, action) {
  if (action.type === ADD_SYMBOL) {
    const { symbol } = action;
    if (state.symbols.indexOf(symbol) !== -1) {
      return {
        ...state,
        symbols: state.symbols.concat(action)
      };
    }
  }

  if (action.type === RECEIVE_DATA) {
    const { symbol, price, date } = action;
    return receiveData(state, action);
  }

  if (action.type === RECEIVE_BATCHED_DATA) {
    const { prices, date} = action;
    const symbols = Object.keys(prices);
    let nextState = state;
    symbols.forEach(symbol => {
      nextState = receiveData(nextState, {
        symbol,
        price: prices[symbol],
        date
      });
    });
    return nextState;
  }
  return state;
}
