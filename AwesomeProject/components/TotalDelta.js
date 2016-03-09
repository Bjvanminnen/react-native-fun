'use strict';
import React, {
  Component,
  ScrollView,
  StyleSheet
} from 'react-native';

import StockRow from './StockRow';

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: '#F5FCFF',
    top: 0
  }
});


export default class TotalDelta extends Component {
  render() {
    const { quotes, purchasePrices } = this.props;

    const stocks = Object.keys(quotes).map((symbol, index) => (
      <StockRow
        key={index}
        symbol={symbol}
        price={quotes[symbol]}
        delta={quotes[symbol] - purchasePrices[symbol]}
      />
    ));

    return (
      <ScrollView contentContainerStyle={styles.scrollView}>
        {stocks}
      </ScrollView>
    );
  }
}
