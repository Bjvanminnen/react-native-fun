'use strict';
import React, {
  Component,
  View,
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


export default class PercentageDeltaVsIndex extends Component {
  render() {
    const { quotes, purchasePrices, onRefresh, index } = this.props;
    if (!quotes || !quotes[index]) {
      return <View/>
    }

    // TODO - currently assumes same amount of time for everything
    // (which is of course false for this set of data)
    const indexPrice = quotes[index];
    const indexDelta = indexPrice - purchasePrices[index];
    console.log(indexPrice, indexDelta);

    const stocks = Object.keys(quotes).map((symbol, index) => {
      const price = quotes[symbol];
      const delta = price - purchasePrices[symbol];
      return (
        <StockRow
          key={index}
          symbol={symbol}
          price={price}
          delta={delta / price - indexDelta / indexPrice}
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
