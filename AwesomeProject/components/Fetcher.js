import React from 'react-native';
import { Text, TouchableNativeFeedback, View } from 'react-native';
import getCurrentPrices from '../js/yahoo';

export default class Fetcher extends React.Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);

    this.state = {
      fetchResult: {}
    };
  }

  handleClick() {
    getCurrentPrices(['MSFT', 'SPY'])
    .then(result => {
      console.log(result);
      this.setState({fetchResult: result});
    });
  }

  render() {
    return (
      <TouchableNativeFeedback onPress={this.handleClick}>
        <View>
          <Text>GO FETCH</Text>
          <Text>{JSON.stringify(this.state.fetchResult)}</Text>
        </View>
      </TouchableNativeFeedback>
    );
  }
}
