import React, { Component } from 'react';
import { Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5'
import {createAppContainer } from 'react-navigation';
import {createBottomTabNavigator} from 'react-navigation-tabs'

import RootNavigator from './android/app/src/navigator/RootNavigator'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
<<<<<<< HEAD
      <RootNavigator />
=======
      <OnAuthStack />
>>>>>>> 74d1dde835de31d22a536cd5d082592645d7bc51
    );
  }
}

export default App;
