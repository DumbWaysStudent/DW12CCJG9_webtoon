import React, { Component } from 'react';
import RootNavigator from './android/app/src/navigator/RootNavigator'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <RootNavigator />
    );
  }
}

export default App;
