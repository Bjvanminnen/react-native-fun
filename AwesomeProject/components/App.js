'use strict';
import React, {
  Component,
  StyleSheet,
  Text,
  View,
  ScrollView,
  PullToRefreshViewAndroid
} from 'react-native';

import { connect } from 'react-redux';
import _ from 'lodash';

import getCurrentPrices from '../js/yahoo';
import StockRow from './StockRow';
import { receiveData } from '../redux/actions';

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch',
    backgroundColor: '#F5FCFF',
    top: 0,
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
        dispatch(receiveData(key, prices[key]));
      });
      this.setState({date: date.toString()});
    });
  }

  render() {
    const { data } = this.props;

    const stocks = Object.keys(data).map((symbol, index) => (
      <StockRow
        key={index}
        symbol={symbol}
        price={data[symbol]}
      />
    ));

    return (
      <PullToRefreshViewAndroid onRefresh={this.onRefresh}>
        <ScrollView contentContainerStyle={styles.container}>
          {stocks}
          <Text>{this.state.date}</Text>
        </ScrollView>
      </PullToRefreshViewAndroid>
    );
  }
}

const selector = state => {
  return {
    symbols: state.symbols,
    data: state.data
  };
}

export default connect(selector)(App);
