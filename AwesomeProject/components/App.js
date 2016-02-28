'use strict';
import React, {
  Component,
  StyleSheet,
  Text,
  View
} from 'react-native';

import { connect } from 'react-redux';

import BrentTitle from './BrentTitle';
import ClickCounter from './ClickCounter';
import LocalStorageTest from './LocalStorageTest';
import Fetcher from './Fetcher';

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    top: 0
  }
});

class App extends Component {
  render() {
    const symbols = this.props.symbols;
    return (
      <View style={styles.container}>
        <BrentTitle/>
        <ClickCounter/>
        <LocalStorageTest/>
        <Fetcher symbols={symbols}/>
      </View>
    );
  }
}

const selector = state => state;

export default connect(selector)(App);
