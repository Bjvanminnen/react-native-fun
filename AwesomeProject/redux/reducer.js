import {
  ADD_SYMBOL,
  RECEIVE_DATA
} from './actions';

const initialState = {
  symbols: ['MSFT', 'GE', 'JNJ', 'KO', 'PEP', 'MCD', 'PM', 'WM', 'BRK-B',
    'INTC', 'VOD', 'XOM', 'VIG', 'PG', 'F', 'AAPL', 'VZ', 'SPY'],
  quotes: {
  },
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
    const { symbol, price } = action;
    return {
      ...state,
      quotes: {
        ...state.quotes,
        [symbol]: price
      }
    };
  }
  return state;
}
