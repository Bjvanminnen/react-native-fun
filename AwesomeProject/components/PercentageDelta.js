'use strict';
import React, {
  Component,
  ScrollView,
  StyleSheet,
  PullToRefreshViewAndroid
} from 'react-native';

import StockRow from './StockRow';

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: '#F5FCFF',
    top: 0
  }
  ,
  flex: {
    flex: 1
  }
});


export default class TotalDelta extends Component {
  render() {
    const { quotes, purchasePrices, onRefresh } = this.props;

    const stocks = Object.keys(quotes).map((symbol, index) => {
      const price = quotes[symbol];
      const delta = price - purchasePrices[symbol];
      return (
        <StockRow
          key={index}
          symbol={symbol}
          price={price}
          delta={delta / price}
          deltaFormat="0.00%"
        />
      );
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
