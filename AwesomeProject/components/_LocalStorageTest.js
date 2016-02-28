import React from 'react-native';
import { View, Text, TextInput, AsyncStorage } from 'react-native';

export default class LocalStorageTest extends React.Component {
  constructor(props) {
    super(props);

    this.fields = {
      currentText: ''
    };

    this.state = {
      val: "..."
    };

    [
      'changeText',
      'submitEditing',
      'queryLocalStorage'
    ].forEach(fn => this[fn] = this[fn].bind(this));
  }

  queryLocalStorage() {
    AsyncStorage.getItem('react')
    .then(result => {
      console.log('got LS: ' + result);
      this.setState({ val: result });
    });
  }

  submitEditing() {
    console.log('submitEditing: ' + this.fields.currentText);

    AsyncStorage.setItem('react', this.fields.currentText)
    .then(this.queryLocalStorage);
  }

  changeText(text) {
    this.fields.currentText = text;
  }

  componentDidMount() {
    this.queryLocalStorage();
  }

  render() {
    const { val } = this.state;

    return (
      <View>
        <TextInput
          onChangeText={this.changeText}
          onSubmitEditing={this.submitEditing}/>
        <Text>
          LocalStorage: {val}
        </Text>
      </View>
    );
  }
}
