'use strict';
import React, {
  Component,
  StyleSheet,
  Text,
  View,
  ScrollView
} from 'react-native';

import { connect } from 'react-redux';
import _ from 'lodash';

import StockRow from './StockRow';

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch',
    backgroundColor: '#F5FCFF',
    top: 0,
  }
});

class App extends Component {
  render() {
    // const symbols = this.props.symbols;
    const { data } = this.props;

    const stocks = Object.keys(data).map((symbol, index) => (
      <StockRow
        key={index}
        symbol={symbol}
        price={data[symbol]}
      />
    ));

    return (
      <ScrollView contentContainerStyle={styles.container}>
        {stocks}
      </ScrollView>
    );
  }
}

const selector = state => {
  return {
    data: state.data
  };
}

export default connect(selector)(App);
