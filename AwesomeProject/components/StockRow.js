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
    fontSize: 24,
    margin: 0,
    borderWidth: 1,
    borderColor: 'red'
  },
  minus: {
    marginRight: 5,
    paddingLeft: 5,
    paddingRight: 5
  }
});

export default class StockRow extends React.Component {
  render() {
    const { symbol, price } = this.props;
    const priceString = numeral(price || 0).format('0.00');
    const delta = numeral(0).format('0.00');

    return (
      <View style={styles.container}>
        <Text style={styles.text}>{symbol}</Text>
        <Text style={styles.text}>{priceString}</Text>
        <Text style={styles.text}>{delta}</Text>
        <TouchableNativeFeedback>
          <View style={styles.minus}>
            <Text style={styles.text}>-</Text>
          </View>
        </TouchableNativeFeedback>
      </View>
    );
  }
}
