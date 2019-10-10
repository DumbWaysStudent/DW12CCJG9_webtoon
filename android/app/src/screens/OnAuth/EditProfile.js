import React, { Component } from 'react';
import { View, StyleSheet, SafeAreaView, TouchableOpacity, Image, TextInput} from 'react-native';
import  { Text } from 'native-base'
import Icon from "react-native-vector-icons/FontAwesome5";
import ImagePicker from 'react-native-image-picker';

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      profilePicture: this.props.navigation.getParam('profilePic'),
      profileName: this.props.navigation.getParam('name')
    };
  }

  imagePickerHandler() {
    const options = {
      title: 'Select Avatar',
      customButton: [{
        name: 'fb',
        title: 'Choose Photo From Facebook'
      }],
      storageOptions: {
        skipBackup: true,
        path: 'images'
      }
    }
    ImagePicker.showImagePicker(options, (response) => {
      console.log('Response =', response);

      if (response.didCancel) {
        console.log('User Cancelled image picker')
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error)
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton)
      } else {
        const source = { uri: response.uri }

        this.setState({
          profilePicture: source,
        })
      }
    })
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
              <Text style={styles.headerTitleText}>Edit Profile</Text>
            </View>

            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('Profile', {name: this.state.profileName, profilePic: this.state.profilePicture})}
              style={styles.headerEditBtn}>
              <Icon name="check" size={23} />
            </TouchableOpacity>

          </View>
            <View style={styles.profilePicture}>
              <Image large source={this.state.profilePicture} style={styles.profilePictureImage} />
              <TouchableOpacity onPress={()=> this.imagePickerHandler()}>
                <Icon name="camera" size={20} />
              </TouchableOpacity>
              <TextInput
                style={styles.profileNameEdit}
                value={this.state.profileName}
                onChangeText={(text)=> this.setState({profileName: text})}
              />
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
  profileNameEdit: {
    width: 200,
    marginTop: 7,
    borderRadius: 3,
    fontWeight: 'bold',
    padding: 8,
    borderWidth: 2,
    borderColor: '#444',
    textAlign: 'center',
    fontSize: 16
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
