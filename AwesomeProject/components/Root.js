import React from 'react-native';

import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import createLogger from 'redux-logger';

import App from './App';
import reducer from '../redux/reducer';

const logger = createLogger({ collapsed: true });
const store = createStore(reducer, applyMiddleware(logger));

export default function Root(props) {
  return (
    <Provider store={store}>
      <App/>
    </Provider>
  );
}
