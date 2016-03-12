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

import { getCurrentPrices, getHistoricalPrices } from '../js/yahoo';
import { receiveBatchedData } from '../redux/actions';
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

function daysBefore(dateString, days) {
  console.log(dateString);
  const ret = new Date(new Date(dateString) - days * 24 * 60 * 60 * 1000);
  console.log(ret);
  return ret;
}

class App extends Component {
  constructor(props) {
    super(props);

    this.onRefresh = this.onRefresh.bind(this);

    this.state = {
      dateString: null
    };
  }

  componentDidMount() {
    this.onRefresh();
  }

  _getHistoricalPrices(symbols, date) {
    const { dispatch } = this.props;

    getHistoricalPrices(symbols, date)
    .then(prices => {
      dispatch(receiveBatchedData(prices, date.toString()));
    });
  }

  onRefresh() {
    const { symbols, dispatch } = this.props;

    // TODO - action middleware?
    getCurrentPrices(symbols)
    .then(({dateString, prices}) => {
      dispatch(receiveBatchedData(prices, dateString));
      this._getHistoricalPrices(symbols, daysBefore(dateString, 7));
      this.setState({dateString});
    });
  }

  getQuote(symbol, dateString) {
    const { quotes } = this.props;
    if (!quotes[symbol] || quotes[symbol][dateString] === undefined) {
      return;
    }
    return quotes[symbol][dateString];
  }

  render() {
    const { symbols, quotes, purchasePrices } = this.props;
    const { dateString } = this.state;

    const startDateString = daysBefore(dateString, 7);

    return (
      <View style={styles.flex}>
        <Text>{dateString}</Text>
        <SwipeableViews style={styles.flex}>
          <View style={styles.flex}>
            <Text>Weekly Percentage Delta</Text>
            <TotalDelta
              symbols={symbols}
              getEndQuote={symbol => this.getQuote(symbol, dateString)}
              getStartQuote={symbol => this.getQuote(symbol, startDateString)}
              onRefresh={this.onRefresh}
              percentage={true}/>
          </View>
          <View style={styles.flex}>
            <Text>Weekly Delta</Text>
            <TotalDelta
              symbols={symbols}
              getEndQuote={symbol => this.getQuote(symbol, dateString)}
              getStartQuote={symbol => this.getQuote(symbol, startDateString)}
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
