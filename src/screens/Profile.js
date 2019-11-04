import React, { Component } from 'react';
import { View, StyleSheet, SafeAreaView, TouchableOpacity, Image, AsyncStorage, Modal, Dimensions } from 'react-native';
import { Text } from 'native-base'
import Icon from "react-native-vector-icons/FontAwesome5";
import { ScrollView } from 'react-native-gesture-handler';
import { connect } from 'react-redux'
import * as actionProfile from './../redux/actions/actionProfile'
import SpinIcon from './../components/SpinIcon'

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      profilePicture: require('../assets/images/profile-picture-default.png'),
      profileName: 'Fikri Haikal'
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

          this.props.handleGetProfile({
            userID: this.state.sigInData.id,
            token: this.state.sigInData.token
          })
          
        }
      } else {
        console.log(err)
      }
    })
  }

  // updateData = (newData1, newData2) => {
  //   this.setState({ profileName: newData1, profilePicture: newData2 })
  // }

  logoutHandler() {
    AsyncStorage.clear()
    this.props.navigation.navigate('SignIn')
  }

  render() {
    console.log(this.props.localProfile.profile)
    return (
      <SafeAreaView style={styles.container}>
        <Modal animationType="none"
          transparent={true}
          visible={(this.props.localProfile.isLoading)}
          // onRequestClose={() => {
          //   this.setModalVisible(this.props.localWebtoons.isLoading)
          // }}
          style={{ backgroundColor: 'red' }}
        >
          <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.5)' }}>
            <View style={{ position: 'absolute', top: height / 2.3, left: width / 2.1 }}>
              <SpinIcon>
                <Icon name="spinner" size={30} style={{ color: "#fff", alignSelf: 'center' }} />
              </SpinIcon>
            </View>
          </View>
        </Modal>
        <ScrollView>
          <View style={styles.header}>

            <View style={styles.headerTitle}>
              <Text style={styles.headerTitleText}>Profile</Text>
            </View>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('EditProfile',
              {
                name: this.props.localProfile.profile.name,
                profilePic: (this.props.localProfile.profile.profile_image == 'default-pic')
                ? this.state.profilePicture
                : this.props.localProfile.profile.profile_image
              })}
              style={styles.headerEditBtn}>
              <Icon name="edit" style={{ color: '#fff' }} size={23} />
            </TouchableOpacity>

          </View>
          <View style={styles.profilePicture}>
            <Image large source={(this.props.localProfile.profile.profile_image == 'default-pic')
                ? this.state.profilePicture
                : {uri: `https://smoketoon-api.herokuapp.com/${this.props.localProfile.profile.profile_image}`}} style={styles.profilePictureImage} />
            <Text style={styles.profileName}>{
              this.props.localProfile.profile.name
            }</Text>
          </View>
          <View style={styles.options}>
            <View style={[styles.optionsItem, styles.optionsItemTopBorder]}>
              <TouchableOpacity onPress={() => this.props.navigation.navigate('MyWebtoonCreation')} style={{ flexDirection: 'row' }}>
                <Text style={styles.optionsText}>My Webtoon Creation</Text>
                <Icon style={{ marginLeft: 10, marginVertical: 2, color: '#fff' }} name="angle-right" size={20} />
              </TouchableOpacity>
            </View>
            <View style={styles.optionsItem}>
              <TouchableOpacity onPress={() => this.logoutHandler()}>
                <Text style={styles.optionsText}>Log Out</Text>
              </TouchableOpacity>
            </View>
            <View style={{ borderTopWidth: 1, borderTopColor: '#4D4645' }}></View>
          </View>
        </ScrollView>
      </SafeAreaView>
    )
  }
}

const { width, height } = Dimensions.get('window');

const mapStateToProps = state => {
  return {
    localProfile: state.profile,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    // --------- PROFILE -----------//
    handleGetProfile: (params) => dispatch(actionProfile.handleGetProfile(params)),
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
    borderBottomWidth: 1,
    borderTopColor: '#4D4645',
    borderBottomColor: '#232222'
  },
  profilePictureImage: {
    width: 140,
    height: 140,
    borderRadius: 140 / 2,
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Profile);
