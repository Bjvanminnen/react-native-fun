'use strict';
import React, {
  Component,
  Text,
  ScrollView,
  StyleSheet,
  PullToRefreshViewAndroid
} from 'react-native';

import StockRow from './StockRow';

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: '#F5FCFF',
    top: 0
  },
  flex: {
    flex: 1
  }
});


export default class TotalDelta extends Component {
  render() {
    const { symbols, getEndQuote, getStartQuote, onRefresh } = this.props;

    const stocks = symbols.map((symbol, index) => {
      const endQuote = getEndQuote(symbol);
      const startQuote = getStartQuote(symbol);
      if (!endQuote || !startQuote) {
        return;
      }
      return <StockRow
        key={index}
        symbol={symbol}
        price={endQuote}
        delta={endQuote - startQuote}
      />
    });

    return (
      <PullToRefreshViewAndroid onRefresh={onRefresh} style={styles.flex}>
        <ScrollView contentContainerStyle={styles.scrollView}>
          {stocks}
        </ScrollView>
      </PullToRefreshViewAndroid>
    );
  }
}
