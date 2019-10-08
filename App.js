import React, { Component } from 'react';
import { Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5'
import {createAppContainer } from 'react-navigation';
import {createBottomTabNavigator} from 'react-navigation-tabs'

import OnAuth from './android/app/src/navigator/OnAuth'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <OnAuth />
    );
  }
}

export default App;
