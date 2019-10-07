import React, { Component } from 'react';
import { View, Text, SafeAreaView, StyleSheet } from 'react-native';
import { Content, Item, Input, Label } from "native-base";
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todoListItems: []
    };
  }

  render() {
    return (
      <View></View>

    );
  }
}

export default App;
