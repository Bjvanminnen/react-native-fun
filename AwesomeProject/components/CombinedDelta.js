'use strict';
import React, {
  Component,
  Text,
  ScrollView,
  StyleSheet,
  PullToRefreshViewAndroid
} from 'react-native';

import StockRow from './StockRow';
import HeaderRow from './HeaderRow';

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: '#F5FCFF',
    top: 0
  },
  flex: {
    flex: 1
  }
});


export default class CombinedDelta extends Component {
  render() {
    const {
      symbols, getEndQuote, getStartQuote, onRefresh, index
    } = this.props;

    const stocks = symbols.map((symbol, i) => {
      const endQuote = getEndQuote(symbol);
      const startQuote = getStartQuote(symbol);

      const endQuoteIndex = getEndQuote(index);
      const startQuoteIndex = getStartQuote(index);

      if (!endQuote || !startQuote || !endQuoteIndex || !startQuoteIndex) {
        return;
      }

      const delta = (endQuote - startQuote) / startQuote;
      const indexDelta = (endQuoteIndex - startQuoteIndex) / startQuoteIndex;
      return <StockRow
        key={i}
        symbol={symbol}
        price={endQuote}
        delta={delta}
        delta2={delta - indexDelta}
        deltaFormat={'0.00%'}
      />
    });

    return (
      <PullToRefreshViewAndroid onRefresh={onRefresh} style={styles.flex}>
        <ScrollView contentContainerStyle={styles.scrollView}>
          <HeaderRow columns={["Symbol", "Price", "delta", "vs SPY", "-"]}/>
          {stocks}
        </ScrollView>
      </PullToRefreshViewAndroid>
    );
  }
}
