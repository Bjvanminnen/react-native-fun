import {
  ADD_SYMBOL,
  RECEIVE_DATA
} from './actions';

const initialState = {
  symbols: ['MSFT', 'AAPL', 'SPY'],
  quotes: {
  },
  purchasePrices: {
    MSFT: 51,
    AAPL: 102,
    SPY: 189
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
