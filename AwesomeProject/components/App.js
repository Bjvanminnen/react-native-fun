'use strict';
import React, {  
  Component,
  StyleSheet,
  Text,
  View
} from 'react-native';

import BrentTitle from './BrentTitle';
import ClickCounter from './ClickCounter';
import LocalStorageTest from './LocalStorageTest';

export default class App extends Component {
  render() {
    return (
      <View style={styles.container}>
        <BrentTitle/>
        <ClickCounter/>
        <LocalStorageTest/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    top: 0
  }
});
