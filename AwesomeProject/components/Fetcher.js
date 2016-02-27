import React from 'react-native';
import { Text, TouchableNativeFeedback, View } from 'react-native';

export default class Fetcher extends React.Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);

    this.state = {
      fetchResult: {}
    };
  }

  handleClick() {
    fetch('http://jsonplaceholder.typicode.com/posts/2')
    .then(result => result.json())
    .then(result => {
      this.setState({fetchResult: result});
      console.log(result);
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
