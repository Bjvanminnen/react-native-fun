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
    const { symbols, getEndQuote, getStartQuote, onRefresh, percentage } = this.props;

    const stocks = symbols.map((symbol, index) => {
      const endQuote = getEndQuote(symbol);
      const startQuote = getStartQuote(symbol);
      if (!endQuote || !startQuote) {
        return;
      }

      const divisor = percentage ? startQuote : 1;
      return <StockRow
        key={index}
        symbol={symbol}
        price={endQuote}
        delta={numeral(endQuote - startQuote) / divisor}
        deltaFormat={percentage ? '0.00%' : '0.00'}
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
