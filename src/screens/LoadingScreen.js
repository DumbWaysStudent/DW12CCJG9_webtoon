import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';

class LoadingScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <View style={{flex: 1, backgroundColor: '#444', alignItems: 'center'}}>
          <View style={{marginVertical: 250}}>
            <Image style={{width: 150, height: 150}} source={require('../images/logo/smokeLogo.png')} />
            <Text style={{color: '#fff', textAlign: 'center', marginTop: 15, fontFamily: 'KOMIKASL', fontSize: 16}}>SMOKETOON</Text>
          </View>
          <Text>{setTimeout(()=>{
              this.props.navigation.navigate('LogIn')
          }, 1000)}</Text>
      </View>
    );
  }
}

export default LoadingScreen;
