import React from 'react-native';

import { createStore } from 'redux';
import { Provider } from 'react-redux';

import App from './App';
import reducer from '../redux/reducer';

const store = createStore(reducer);

export default function Root(props) {
  return (
    <Provider store={store}>
      <App/>
    </Provider>
  );
}
