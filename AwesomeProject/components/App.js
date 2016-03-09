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
import SwipeableViews from 'react-swipeable-views/lib/index.native.animated';

import getCurrentPrices from '../js/yahoo';
import { receiveData } from '../redux/actions';
import TotalDelta from './TotalDelta';

const styles = StyleSheet.create({
  container: {
    flex: 1
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
    const { quotes, purchasePrices } = this.props;

    return (
      <PullToRefreshViewAndroid
          onRefresh={this.onRefresh}
          style={styles.container}>
        <View>
          <Text>{this.state.date}</Text>
          <SwipeableViews>
            <TotalDelta quotes={quotes} purchasePrices={purchasePrices}/>
            <View>
              <Text>OTHER</Text>
            </View>
          </SwipeableViews>
        </View>
      </PullToRefreshViewAndroid>
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
