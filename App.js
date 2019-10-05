import React, { Component } from 'react';
import { View, Text, SafeAreaView, StyleSheet } from 'react-native';
import { Content, Item, Input, Label } from "native-base";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todoListItems: []
    };
  }

  render() {
    return (
      <Item fixedLabel>
        <Label>Username</Label>
        <Input />
      </Item>

    );
  }
}

export default App;
