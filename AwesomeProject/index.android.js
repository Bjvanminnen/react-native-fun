/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';
import React, {
  AppRegistry,
  Component,
  StyleSheet,
  Text,
  View
} from 'react-native';

import BrentTitle from './components/BrentTitle';
import ClickCounter from './components/ClickCounter';
import LocalStorageTest from './components/LocalStorageTest';

class AwesomeProject extends Component {
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

AppRegistry.registerComponent('AwesomeProject', () => AwesomeProject);
