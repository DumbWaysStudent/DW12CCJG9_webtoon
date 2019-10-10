import React, { Component } from 'react';
import { View, StyleSheet, SafeAreaView, TouchableOpacity, Image} from 'react-native';
import  { Text } from 'native-base'
import Icon from "react-native-vector-icons/FontAwesome5";

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      profilePicture: this.props.navigation.getParam('profilePic'),
      profileName: this.props.navigation.getParam('name')
    };
  }

  render() {
    if (!this.state.profileName) {
      this.setState({
        profileName: 'Fikri Haikal',
        profilePicture: require('../../main/assets/images/user-icon.png.jpg')
      })
    }
    return (
      <SafeAreaView style={styles.container}>
          <View style={styles.header}>

            <View style={styles.headerTitle}>
              <Text style={styles.headerTitleText}>Profile</Text>
            </View>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('EditProfile', {name: this.state.profileName, profilePic: this.state.profilePicture})}
              style={styles.headerEditBtn}>
              <Icon name="edit" size={23} />
            </TouchableOpacity>

          </View>
            <View style={styles.profilePicture}>
              <Image large source={this.state.profilePicture} style={styles.profilePictureImage} />
              <Text style={styles.profileName}>{this.state.profileName}</Text>
            </View>
            <View style={styles.options}>
              <View style={[styles.optionsItem, styles.optionsItemTopBorder]}>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('MyWebtoonCreation')} style={{flexDirection: 'row'}}>
                  <Text style={styles.optionsText}>My Webtoon Creation</Text>
                  <Icon style={{marginLeft: 10, marginVertical: 2}} name="angle-right" size={20} />
                </TouchableOpacity>
              </View>
              <View style={styles.optionsItem}>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('LogIn')}>
                  <Text style={styles.optionsText}>Log Out</Text>
                </TouchableOpacity>
              </View>
            </View>
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  header: {
    flexDirection: 'row',
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderBottomWidth: 1,
    borderColor: '#ddd'
  },
  headerTitle: {
    flex: 1,
    flexDirection: 'row',
    padding: 6
  },
  headerTitleText: {
    fontSize: 16,
    fontWeight: 'bold'
  },
  headerEditBtn: {
    flex: 1,
    flexDirection: 'row-reverse',
    padding: 6
  },
  profilePicture: {
    alignItems: 'center',
    paddingVertical: 15
  },
  profilePictureImage: {
    width: 140,
    height: 140 ,
    borderRadius: 140/2
  },
  profileName: {
    fontWeight: 'bold',
    padding: 8
  },
  optionsItem: {
    borderBottomWidth: 2,
    borderColor: '#444',
    paddingVertical: 20,
    paddingHorizontal: 10
  },
  optionsItemTopBorder: {
    borderTopWidth: 2,
  }
})

export default Profile;
