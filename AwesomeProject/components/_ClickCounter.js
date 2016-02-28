import React from 'react-native';
import { Text, TouchableNativeFeedback, View } from 'react-native';

export default class ClickCounter extends React.Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);

    this.state = {
      clickCount: 0
    };
  }

  handleClick() {    
    this.setState({clickCount: this.state.clickCount + 1});
  }

  render() {
    return (
      <TouchableNativeFeedback onPress={this.handleClick}>
        <View>
          <Text>TOUCH ME</Text>
          <Text>{this.state.clickCount}</Text>
        </View>
      </TouchableNativeFeedback>
    );
  }
}
