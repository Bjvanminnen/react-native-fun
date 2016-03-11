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
import SwipeableViews from 'react-swipeable-views/lib/index.native.animated';

import getCurrentPrices from '../js/yahoo';
import { receiveData } from '../redux/actions';
import TotalDelta from './TotalDelta';
import PercentageDelta from './PercentageDelta';
import PercentageDeltaVsIndex from './PercentageDeltaVsIndex';

const styles = StyleSheet.create({
  flex: {
    flex: 1
  },
  scrollView: {
    backgroundColor: '#F5FCFF',
    top: 0
  }
});

class App extends Component {
  constructor(props) {
    super(props);

    this.onRefresh = this.onRefresh.bind(this);

    this.state = {
      date: null
    };
  }

  componentDidMount() {
    this.onRefresh();
  }

  onRefresh() {
    const { symbols, dispatch } = this.props;
    // TODO - action middleware?
    getCurrentPrices(symbols)
    .then(({date, prices}) => {
      Object.keys(prices).forEach(key => {
        dispatch(receiveData(key, prices[key], date.toString()));
      });
      this.setState({date: date.toString()});
    });
  }

  getQuote(symbol, date) {
    const { quotes } = this.props;
    if (!quotes[symbol] || quotes[symbol][date] === undefined) {
      return;
    }
    return quotes[symbol][date];
  }

  render() {
    const { symbols, quotes, purchasePrices } = this.props;
    const { date } = this.state;

    return (
      <View style={styles.flex}>
        <Text>{date}</Text>
        <SwipeableViews style={styles.flex}>
          <View style={styles.flex}>
            <Text>Change Since Purchase</Text>
            <TotalDelta
              symbols={symbols}
              getEndQuote={symbol => this.getQuote(symbol, date)}
              getStartQuote={symbol => purchasePrices[symbol]}
              onRefresh={this.onRefresh}/>
          </View>
        </SwipeableViews>
      </View>
    );
  }
}

const selector = state => {
  return {
    symbols: state.symbols,
    quotes: state.quotes,
    purchasePrices: state.purchasePrices
  };
}

export default connect(selector)(App);
