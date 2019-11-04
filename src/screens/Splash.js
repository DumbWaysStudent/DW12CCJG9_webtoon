import React, { Component } from 'react';
import { View, Text, Image, AsyncStorage } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import SpinIcon from '../components/SpinIcon';
// import jwt from 'jsonwebtoken';

class Splash extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  verifyToken() {
    AsyncStorage.getItem('sigInData', (err, res) => {
      if (!err){
        if (res == null) {
          setTimeout(()=>{
            this.props.navigation.navigate('SignIn')
          }, 1000)
        } else {
          res = JSON.parse(res);
          const token = res.token
          if (token) {
            // jwt.verify(token, '12378bhdfhdsj783hjsdf237rhjsd', function(err, decoded) {
            //   console.log(err);
            //   if (decoded !== undefined) {
            //     this.props.navigation.navigate('ForYou');
            //   } else {
            //     this.props.navigation.navigate('SignIn');
            //   }
            // });
            
            setTimeout(()=>{
              this.props.navigation.navigate('ForYou')
            }, 1000)
          } else {
            setTimeout(()=>{
              this.props.navigation.navigate('SignIn')
            }, 1000)
          }
        }
      } else {
        setTimeout(()=>{
          this.props.navigation.navigate('SignIn')
        }, 1000)
      }
    })
  }

  render() {
    return (
      <View style={{flex: 1, backgroundColor: '#444', alignItems: 'center'}}>
          <View style={{marginVertical: 250}}>
            <Image style={{width: 150, height: 150}} source={require('../assets/images/logo/bannerSomkeToonBordered.png')} />
            <Text style={{color: '#fff', textAlign: 'center', marginTop: 15, fontFamily: 'KOMIKASL', fontSize: 16}}>SMOKETOON</Text>
          </View>
          <View style={{position: 'absolute', top: 450}}>
          <SpinIcon>
              <Icon name="spinner" size={23} style={{color: "#fff", alignSelf: 'center'}} />
            </SpinIcon>
            </View>
          <Text>{this.verifyToken()}</Text>
      </View>
    );
  }
}

export default Splash;
