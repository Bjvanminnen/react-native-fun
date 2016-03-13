'use strict';
import React, {
  View,
  Text,
  StyleSheet,
  TouchableNativeFeedback
} from 'react-native';
import numeral from 'numeral';

const styles = StyleSheet.create({
  container: {
    padding: 5,
    borderWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  text: {
    fontSize: 20,
    margin: 0
  },
  negative: {
    color: 'red'
  },
  positive: {
    color: 'green'
  },
  minus: {
    marginRight: 5,
    paddingLeft: 5,
    paddingRight: 5
  }
});

export default class StockRow extends React.Component {
  render() {
    const { symbol, price, delta, delta2, deltaFormat } = this.props;
    const priceString = numeral(price || 0).format('0.00');
    const deltaString = numeral(delta || 0).format(deltaFormat || '0.00');

    let delta2Component;
    if (delta2 !== undefined) {
      const delta2String = numeral(delta2).format(deltaFormat || '0.00');
      delta2Component = (
        <Text
            style={[styles.text, delta2 >= 0 ? styles.positive : styles.negative]}>
          {delta2String}
        </Text>
      );
    }

    return (
      <View style={styles.container}>
        <Text style={styles.text}>{symbol}</Text>
        <Text style={styles.text}>{priceString}</Text>
        <Text
            style={[styles.text, delta >= 0 ? styles.positive : styles.negative]}>
          {deltaString}
        </Text>
        {delta2Component}
        <TouchableNativeFeedback>
          <View style={styles.minus}>
            <Text style={styles.text}>-</Text>
          </View>
        </TouchableNativeFeedback>
      </View>
    );
  }
}
