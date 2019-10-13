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
          <View style={styles.header}>

            <View style={styles.headerTitle}>
              <Text style={styles.headerTitleText}>Profile</Text>
            </View>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('EditProfile', {name: this.state.profileName, profilePic: this.state.profilePicture, updateData : this.updateData})}
              style={styles.headerEditBtn}>
              <Icon name="edit" style={{color: '#fff'}} size={23} />
            </TouchableOpacity>

          </View>
            <View style={styles.profilePicture}>
              <Image large source={this.state.profilePicture} style={styles.profilePictureImage} />
              <Text style={styles.profileName}>{
                this.state.profileName
              }</Text>
            </View>
            <View style={styles.options}>
              <View style={[styles.optionsItem, styles.optionsItemTopBorder]}>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('MyWebtoonCreation')} style={{flexDirection: 'row'}}>
                  <Text style={styles.optionsText}>My Webtoon Creation</Text>
                  <Icon style={{marginLeft: 10, marginVertical: 2, color: '#fff'}} name="angle-right" size={20} />
                </TouchableOpacity>
              </View>
              <View style={styles.optionsItem}>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('LogIn')}>
                  <Text style={styles.optionsText}>Log Out</Text>
                </TouchableOpacity>
              </View>
              <View style={{borderTopWidth: 1, borderTopColor: '#4D4645' }}></View>
            </View>
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#383332'
  },
  header: {
    flexDirection: 'row',
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderBottomWidth: 1,
    borderColor: '#232222'
  },
  headerTitle: {
    flex: 1,
    flexDirection: 'row',
    padding: 6
  },
  headerTitleText: {
    fontSize: 16,
    fontFamily: 'KOMIKAHB',
    color: '#fff'
  },
  headerEditBtn: {
    flex: 1,
    flexDirection: 'row-reverse',
    padding: 6
  },
  profilePicture: {
    alignItems: 'center',
    paddingVertical: 15,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderTopColor: '#4D4645',
    borderBottomColor: '#232222'
  },
  profilePictureImage: {
    width: 140,
    height: 140 ,
    borderRadius: 140/2,
    backgroundColor: '#ddd'
  },
  profileName: {
    fontFamily: 'KOMIKAHB',
    padding: 8,
    color: '#fff'
  },
  optionsItem: {
    borderBottomWidth: 1,
    borderBottomColor: '#232222',
    borderTopWidth: 1,
    borderColor: '#4D4645',
    paddingVertical: 20,
    paddingHorizontal: 10
  },
  optionsItemTopBorder: {
    borderTopWidth: 1,
    borderColor: '#4D4645'
  },
  optionsText: {
    fontFamily: 'KOMIKAHB',
    color: '#fff'
  }
})

export default Profile;
