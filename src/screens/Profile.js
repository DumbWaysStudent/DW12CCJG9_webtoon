import React, { Component } from 'react';
import { View, StyleSheet, SafeAreaView, TouchableOpacity, Image} from 'react-native';
import  { Text } from 'native-base'
import Icon from "react-native-vector-icons/FontAwesome5";

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      profilePicture: require('../assets/images/profile-picture-default.png'),
      profileName: 'Fikri Haikal'
    };
  }

  updateData = (newData1, newData2) => {
    this.setState({profileName : newData1, profilePicture: newData2})
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
          
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#383332'
  }
})

export default Profile;
