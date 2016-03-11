export const ADD_SYMBOL = 'ADD_SYMBOL';
export const addSymbol = symbol => { type: ADD_SYMBOL, symbol };

export const RECEIVE_DATA = 'RECEIVE_DATA';
export const receiveData = (symbol, price, date) => ({
  type: RECEIVE_DATA,
  symbol,
  price,
  date
});
