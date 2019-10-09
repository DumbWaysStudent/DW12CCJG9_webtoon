import React, { Component } from 'react';
import OnAuthStack from './android/app/src/navigator/OnAuthStack';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <OnAuthStack />
    );
  }
}

export default App;
