import {
  ADD_SYMBOL,
  RECEIVE_DATA
} from './actions';

const initialState = {
  symbols: ['MSFT', 'AAPL', 'SPY'],
  data: {    
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
      data: {
        ...state.data,
        [symbol]: price
      }
    };
  }
  return state;
}
