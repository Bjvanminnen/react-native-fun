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
  }
});

export default class HeaderRow extends React.Component {
  render() {
    const { columns } = this.props;

    return (
      <View style={styles.container}>
        {
          columns.map((colName, index) => (
            <Text key={index} style={styles.text}>{colName}</Text>
          ))
        }
      </View>
    );
  }
}
