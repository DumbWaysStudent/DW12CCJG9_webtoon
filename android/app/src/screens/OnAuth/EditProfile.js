import React, { Component } from 'react';
import { View, StyleSheet, SafeAreaView, TouchableOpacity, Image} from 'react-native';
import  { Text } from 'native-base'
import Icon from "react-native-vector-icons/FontAwesome5";
import ImagePicker from 'react-native-image-picker';

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      profilePicture: require('../../main/assets/images/noblesse-awakening.jpg')
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
          profilePicture: source
        })
      }
    })
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
          <View style={styles.header}>

            <View style={styles.headerTitle}>
              <Text style={styles.headerTitleText}>Edit Profile</Text>
            </View>

            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('Profile')}
              style={styles.headerEditBtn}>
              <Icon name="check" size={23} />
            </TouchableOpacity>

          </View>
            <View style={styles.profilePicture}>
              <Image large source={this.state.profilePicture} style={styles.profilePictureImage} />
              <TouchableOpacity onPress={()=> this.imagePickerHandler()}>
                <Icon name="camera" />
              </TouchableOpacity>
              <Text style={styles.profileName}>Fikri Haikal</Text>
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
