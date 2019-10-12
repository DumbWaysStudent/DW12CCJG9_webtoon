import React, { Component } from 'react';
import { View, StyleSheet, SafeAreaView, TouchableOpacity, Image, TextInput} from 'react-native';
import  { Text } from 'native-base'
import Icon from "react-native-vector-icons/FontAwesome5";
import ImagePicker from 'react-native-image-picker';

class EditProfile extends Component {
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
  
updateDataHanlder = (x, y) => {
    this.props.navigation.state.params.updateData(x, y)
    this.props.navigation.navigate('Profile', {name: this.state.profileName, profilePic: this.state.profilePicture})
  }
  render() {
    return (
      <SafeAreaView style={styles.container}>
          <View style={styles.header}>

            <View style={styles.headerTitle}>
              <Text style={styles.headerTitleText}>Edit Profile</Text>
            </View>

            <TouchableOpacity
              onPress={() => this.updateDataHanlder(this.state.profileName, this.state.profilePicture) }
              style={styles.headerEditBtn}>
              <Icon name="check" style={{color: '#fff'}} size={23} />
            </TouchableOpacity>

          </View>
            <View style={styles.profilePicture}>
              <Image large source={this.state.profilePicture} style={styles.profilePictureImage} />
              <TouchableOpacity onPress={()=> this.imagePickerHandler()}>
                <Icon name="camera" style={{color: '#fff'}} size={20} />
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
    borderTopColor: '#4D4645'
  },
  profilePictureImage: {
    width: 140,
    height: 140 ,
    borderRadius: 140/2,
    backgroundColor: '#ddd'
  },
  profileNameEdit: {
    width: 200,
    marginTop: 15,
    borderRadius: 3,
    padding: 8,
    borderWidth: 1,
    borderColor: '#444',
    textAlign: 'center',
    fontSize: 16,
    fontFamily: 'KOMIKAH_',
    color: '#fff',
    backgroundColor: '#4D4645'
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

export default EditProfile;
