import React, { Component } from 'react';
import { Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5'
import {createAppContainer } from 'react-navigation';
import {createBottomTabNavigator} from 'react-navigation-tabs'

import UnAuth from './android/app/src/navigator/UnAuth'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <UnAuth />
    );
  }
}

export default App;
