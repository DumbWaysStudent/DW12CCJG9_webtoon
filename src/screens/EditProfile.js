import React, { Component } from 'react';
import { View, StyleSheet, SafeAreaView, TouchableOpacity, Image, TextInput, AsyncStorage } from 'react-native';
import { Text, Toast } from 'native-base'
import Icon from "react-native-vector-icons/FontAwesome5";
import ImagePicker from 'react-native-image-picker';
import { ScrollView } from 'react-native-gesture-handler';
import { connect } from 'react-redux'
import * as actionProfile from './../redux/actions/actionProfile'
import { Image_URL } from './../services/rest-api'

class EditProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      profilePicture: {uri: this.props.navigation.getParam('profilePic')},
      profileName: this.props.navigation.getParam('name'),
      profile_image: null,
      sigInData: null
    };
  }

  componentDidMount() {
    AsyncStorage.getItem('sigInData', (err, res) => {
      if (!err){
        if (res == null) {
          this.props.navigation.navigate('SignIn');
        } else {

          this.setState({
            sigInData: JSON.parse(res)
          })
          
        }
      } else {
        // console.log(err)
        this.toastGenerator('error', "Error: Can't load data from localStorage")
      }
    })
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
      // console.log('Response =', response);

      if (response.didCancel) {
        // console.log('User Cancelled image picker')
      } else if (response.error) {
        // console.log('ImagePicker Error: ', response.error)
      } else if (response.customButton) {
        // console.log('User tapped custom button: ', response.customButton)
      } else {
        const source = {
          uri: response.uri,
          type: response.type,
          name: response.fileName
        }

        this.setState({
          profile_image: source,
        })
      }
    })
  }

  updateProfile() {
    let { profileName, profile_image } = this.state;
    let { profilePic, name } = this.props.navigation.state.params;
    const formData = new FormData();
    if (profileName != name && profile_image !== null) {
      formData.append('profileImage', this.state.profile_image);
      formData.append('name', this.state.profileName);

      this.props.handleUpdateProfile({
        userID: this.state.sigInData.id,
        payload: {
          // name: this.state.profileName,
          // profile_image: this.state.profile_image.uri,
          formData
        },
        token: this.state.sigInData.token
      })
      .then(() => {})
      .catch((e) => {
        this.toastGenerator('error', "Error: Can't update profile")
      })
    } else if (profile_image != null) {
      formData.append('profileImage', this.state.profile_image);
      this.props.handleUpdateProfile({
        userID: this.state.sigInData.id,
        payload: {
          formData
        },
        token: this.state.sigInData.token
      })
      .then(() => {})
      .catch((e) => {
        this.toastGenerator('error', "Error: Can't update profile")
      })
    } else if (profileName != name) {
      formData.append('name', this.state.profileName);
      this.props.handleUpdateProfile({
        userID: this.state.sigInData.id,
        payload: {
          formData
        },
        token: this.state.sigInData.token
      })
      .then(() => {})
      .catch((e) => {
        this.toastGenerator('error', "Error: Can't update profile")
      })
    }

    this.props.navigation.goBack()
  }

  updateDataHanlder = (x, y) => {
    this.props.navigation.state.params.updateData(x, y)
    this.props.navigation.navigate('Profile', { name: this.state.profileName, profilePic: this.state.profilePicture })
  }

  toastGenerator = (type = 'error', message) => {
    Toast.show({
      text: message,
      textStyle: { fontSize: 12, fontWeight: 'bold' },
      duration: 1000,
      style: (type == 'error') ? [styles.toastStyle, styles.errorToast] : [styles.toastStyle, styles.successToast]
    });
  }

  // getPicture = () => {
  //   if (this.state.profile_image !== null) {
  //     return this.state.profile_image
  //   } else if (this.state.profilePicture.uri) {
  //     return { uri: `${Image_URL}/${this.state.profilePicture.uri}` }
  //   } else {
  //     return this.state.profilePicture.uri
  //   }
  // }

  render() {
    console.log(this.state.profilePicture.uri.toString().match(/(^\d+)/g))
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView>
          <View style={styles.header}>

            <View style={styles.headerTitle}>
              <Text style={styles.headerTitleText}>Edit Profile</Text>
            </View>

            <TouchableOpacity
              onPress={() => this.updateProfile()}
              style={styles.headerEditBtn}>
              <Icon name="check" style={{ color: '#fff' }} size={23} />
            </TouchableOpacity>

          </View>
          <View style={styles.profilePicture}>
            <Image large source={(this.state.profile_image !== null) ? this.state.profile_image : (this.state.profilePicture.uri.toString().match(/(^\d+)/g) === null) ? {uri: `${Image_URL}/${this.state.profilePicture.uri}`} : this.state.profilePicture.uri} style={styles.profilePictureImage} />
            <TouchableOpacity onPress={() => this.imagePickerHandler()}>
              <Icon name="camera" style={{ color: '#fff' }} size={20} />
            </TouchableOpacity>
            <TextInput
              style={styles.profileNameEdit}
              value={this.state.profileName}
              onChangeText={(text) => this.setState({ profileName: text })}
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    )
  }
}

const mapStateToProps = state => {
  return {
    localProfile: state.profile,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    // --------- PROFILE -----------//
    handleUpdateProfile:(params) => dispatch(actionProfile.handleUpdateProfile(params))
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
    height: 140,
    borderRadius: 140 / 2,
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
  },
  toastStyle: {
    marginHorizontal: 5,
    marginBottom: 10,
    borderRadius: 5
  },
  errorToast: {
    backgroundColor: '#ff3333'
  },
  successToast: {
    backgroundColor: '#2ab325'
  },
  signIntoastError: {
    backgroundColor: '#ff3333',
    marginHorizontal: 5,
    marginBottom: 5,
    borderRadius: 5
  },
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditProfile);