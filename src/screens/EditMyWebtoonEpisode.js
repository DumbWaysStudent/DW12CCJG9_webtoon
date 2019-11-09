import React, { Component } from 'react';
import { View, StyleSheet, SafeAreaView, TouchableOpacity, FlatList, TextInput, AsyncStorage, Modal, Dimensions } from 'react-native';
import { Text, Thumbnail, Item, Button, Toast } from 'native-base';
import Icon from "react-native-vector-icons/FontAwesome5";
import { connect } from 'react-redux';
import * as actionEpisode from './../redux/actions/actionEpisode';
import * as actionImage from './../redux/actions/actionImage';
import * as actionWebtoon from './../redux/actions/actionWebtoon';
import ImagePicker from 'react-native-image-picker';
import Axios from 'axios'
import { ScrollView } from 'react-native-gesture-handler';
import SpinIcon from './../components/SpinIcon'
import {API_URL, Image_URL} from './../services/rest-api'

class EditMyWebtoonEpisode extends Component {
  constructor(props) {
    super(props);
    this.state = {
      titleValue: this.props.navigation.getParam('title'),
      signInData: null,
      images: []
    }

    AsyncStorage.getItem('sigInData', (err, res) => {
      if (!err) {
        if (res == null) {
          this.props.navigation.navigate('SignIn');
        } else {
          // store sig in data to local state

          this.setState({
            signInData: JSON.parse(res)
          })
          // console.log(res.id)
          // console.log(JSON.parse(res).token)
          this.props.handleGetImages({
            webtoonID: this.props.navigation.getParam('webtoonID'),
            episodeID: this.props.navigation.getParam('episodeID'),
            token: this.state.signInData.token
          })
          .then(result => {
            console.log(this.props.navigation)
            this.setState({
              // images: result.data,
              titleValue: this.props.navigation.getParam('title')
            })
          })
          .catch(err => {
            this.toastGenerator('error', "Error: Can't load episode pages data")
          })
          // Axios({
          //   method: 'get',
          //   url: `${API_URL}/webtoon/${this.props.navigation.getParam('webtoonID')}/episode/${this.props.navigation.getParam('episodeID')}`,
          //   headers: {
          //     Authorization: this.state.signInData.token
          //   }
          // })
          //   .then(result => {
          //     this.setState({
          //       images: result.data,
          //       titleValue: this.props.navigation.getParam('title')
          //     })
          //   })
          //   .catch(err => {
          //     this.toastGenerator('error', "Error: Can't load episode pages data")
          //   })
        }
      } else {
        this.toastGenerator('error', "Error: Can't load data from localStorage")
      }
    })
  }

  // componentDidMount() {
  //   console.log(this.props.navigation.state.params)
    
  // }

  convertDate(date) {
    let
      day = ['Sun', 'Mon', 'Tue', 'Thu', 'Fri', 'Sat'],
      month = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    return `${date.getDate()} ${month[date.getMonth()]} ${date.getFullYear()}`;
  }

  addImageHandle(index) {
    const options = {
      title: 'Select Banner',
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
        // this.setState({images: })
        let images = this.state.images
        let formData = new FormData();
        formData.append('page', this.props.localImages.images.length + 1)
        formData.append('pageImage', {
          uri: response.uri,
          type: response.type,
          name: response.fileName
        })

        this.props.handleAddImage({
          userID: this.state.signInData.id,
          webtoonID: this.props.navigation.getParam('webtoonID'),
          episodeID: this.props.navigation.getParam('episodeID'),
          token: this.state.signInData.token,
          formData
        })
        .then(() => {
          images.push({
            page: images.length + 1,
            image: response.uri,
          });
  
          this.setState({
            images: images
          })
        })
        .catch((e) => {
          this.toastGenerator('error', "Error: Can't add image")
        })
      }
    })
  }

  deleteEpisodeHandle() {
    console.log(this.props.navigation.state.params)
    this.props.handleDeleteEpisode({
      userID: this.state.signInData.id,
      webtoonID: this.props.navigation.getParam('webtoonID'),
      episodeID: this.props.navigation.getParam('episodeID'),
      token: this.state.signInData.token
    })
    .then(() => {
      this.props.handleGetMyWebtoons({
        userID: this.state.signInData.id,
        token: this.state.signInData.token
      })
      this.toastGenerator('success', "Delete episode success")
      this.props.navigation.goBack()
    })
    .catch((e) => {
      this.toastGenerator('error', "Error: Can't delete episode")
      this.props.navigation.goBack()
    })
  }

  deleteImageHandle(id, page) {
    // let newItem = this.state.images.filter(item => item.page != page)

    this.props.handleDeleteImage({
      userID: this.state.signInData.id,
      webtoonID: this.props.navigation.getParam('webtoonID'),
      episodeID: this.props.navigation.getParam('episodeID'),
      imageID: id,
      token: this.state.signInData.token
    })
    .then(() => {
      this.toastGenerator('success', "Delete image success")
    })
    .catch((e) => {
      this.toastGenerator('error', "Error: Can't delete image")
    })

    // this.setState({
    //   images: newItem
    // })
  }

  okBtnHandle() {
    if (this.props.navigation.getParam('title') != this.state.titleValue || this.props.localImages.images != false) {
      this.props.handleUpdateEpisode({
        userID: this.state.signInData.id,
        webtoonID: this.props.navigation.getParam('webtoonID'),
        episodeID: this.props.navigation.getParam('episodeID'),
        title: (this.state.titleValue) ? this.state.titleValue : this.props.navigation.getParam('title'),
        image: (this.props.localImages.images != false) ? this.props.localImages.images[0].image : this.props.navigation.getParam('image'),
        token: this.state.signInData.token
      })
      .then(() => {
        this.toastGenerator('success', "Update episode success")
        this.props.navigation.goBack()
      })
      .catch((e) => {
        this.toastGenerator('error', "Error: Can't update episode")
        this.props.navigation.goBack()
      })
    } else {
      this.props.navigation.goBack()
    }
  }

  toastGenerator = (type = 'error', message) => {
    Toast.show({
      text: message,
      textStyle: { fontSize: 12, fontWeight: 'bold' },
      duration: 1000,
      style: (type == 'error') ? [styles.toastStyle, styles.errorToast] : [styles.toastStyle, styles.successToast]
    });
  }

  render() {
    console.log(this.props.localImages.images)
    return (
      <SafeAreaView style={styles.container}>
        <Modal animationType="none"
          transparent={true}
          visible={(this.props.localImages.isLoading || this.props.localEpisodes.isLoading)}
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
        <View style={styles.header}>

          <TouchableOpacity onPress={() => this.props.navigation.goBack()} style={styles.headerBackBtn}>
            <Icon name="arrow-left" style={{ color: '#fff' }} size={23} />
          </TouchableOpacity>

          <Text style={styles.headerTitle}>Edit Webtoon Episode</Text>

          <TouchableOpacity
            onPress={() => this.okBtnHandle()}
            style={styles.headerOkBtn}>
            <Icon name="check" style={{ color: '#fff' }} size={23} />
          </TouchableOpacity>
        </View>
        <View style={styles.createWebtoonEpPallete}>
          <View style={styles.palleteItem}>
            <Text style={styles.palleteItemTitle}>Title</Text>
            <TextInput style={styles.palleteItemInput} onChangeText={(text) => this.setState({ titleValue: text })} value={this.state.titleValue} />
          </View>
          <View style={[styles.palleteItem, styles.imageContainer]}>
            <Text style={styles.palleteItemTitle}>Add Image</Text>
            <FlatList
              showsHorizontalScrollIndicator={false}
              data={this.props.localImages.images}
              renderItem={({ item }) =>
                <Item style={styles.imageItem}>
                  <Thumbnail source={{ uri: `${Image_URL}/${item.image}` }} style={styles.image} square />
                  <View style={styles.imageInfo}>
                    <Text style={styles.imageTitle}>Page {item.page}</Text>
                    <Button
                      onPress={() => this.deleteImageHandle(item.id, item.page)}
                      style={styles.imageDeleteBtn}><Text style={styles.imageDeleteText}>Delete</Text></Button>
                  </View>
                </Item>
              }
              keyExtractor={item => item.id}
            />
          </View>
          <Button style={styles.palleteBtn} onPress={() => this.addImageHandle()}>
            <Text style={styles.palleteBtnText}>
              <Icon name="plus" /> Image
                </Text>
          </Button>
          <Button
            onPress={() => this.deleteEpisodeHandle()}
            style={[styles.palleteBtn, styles.palleteBtnRemove]}>
            <Text style={styles.palleteBtnText}>
              <Icon name="trash-alt" /> Delete Episode
                </Text>
          </Button>
        </View>
      </SafeAreaView>
    )
  }
}

const { width, height } = Dimensions.get('window')

const mapStateToProps = state => {
  return {
    localWebtoons: state.webtoons,
    localEpisodes: state.episodes,
    localImages: state.images
  }
}

const mapDispatchToProps = dispatch => {
  return {
     // ----------- Webtoons ------------//
     handleGetMyWebtoons: (params) => dispatch(actionWebtoon.handleGetMyWebtoons(params)),
    // ----------- Episodes ------------//
    handleUpdateEpisode: (params) => dispatch(actionEpisode.handleUpdateEpisode(params)),
    handleDeleteEpisode: (params) => dispatch(actionEpisode.handleDeleteEpisode(params)),
    handleGetImages: (params) => dispatch(actionImage.handleGetImages(params)),
    handleAddImage: (params) => dispatch(actionImage.handleAddImage(params)),
    handleDeleteImage: (params) => dispatch(actionImage.handleDeleteImage(params))
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
  headerBackBtn: {
    alignItems: 'center',
    padding: 6
  },
  headerTitle: {
    fontSize: 16,
    fontFamily: 'KOMIKAHB',
    color: '#fff',
    padding: 6
  },
  headerOkBtn: {
    flex: 1,
    flexDirection: 'row-reverse',
    padding: 6
  },
  palleteItem: {
    padding: 10,
    paddingHorizontal: 30,
    borderTopWidth: 1,
    borderTopColor: '#4D4645',
  },
  palleteItemTitle: {
    fontSize: 14,
    color: '#fff',
    fontFamily: 'KOMIKAHB',
    marginBottom: 8
  },
  palleteItemInput: {
    borderWidth: 1,
    borderColor: '#444',
    backgroundColor: '#4D4645',
    color: '#fff',
    borderRadius: 4,
    fontFamily: 'KOMIKAH_',
    paddingHorizontal: 10,
    fontSize: 12
  },
  imageContainer: {
    height: 360,
    marginBottom: 10
  },
  imageItem: {
    alignItems: 'flex-start',
    borderBottomWidth: 0,
    marginBottom: 15,
  },
  image: {
    borderWidth: 2,
    borderColor: '#444',
    width: 70,
    height: 70
  },
  imageInfo: {
    padding: 5,
    marginLeft: 8
  },
  imageTitle: {
    fontSize: 14,
    color: '#fff',
    fontFamily: 'KOMIKAH_',
    marginBottom: 10
  },
  imageDeleteBtn: {
    width: 100,
    height: 40,
    paddingHorizontal: 13,
    backgroundColor: '#DA2F2B'
  },
  imageDeleteText: {
    textTransform: 'capitalize',
    fontWeight: 'bold'
  },
  palleteBtn: {
    width: '82%',
    alignSelf: 'center',
    paddingHorizontal: 100,
    backgroundColor: '#ee7a33',
    borderRadius: 6
  },
  palleteBtnText: {
    textTransform: 'capitalize',
    fontFamily: 'KOMIKAH_'
  },
  palleteBtnRemove: {
    paddingHorizontal: 62,
    marginTop: 15,
    backgroundColor: '#DA2F2B'
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
)(EditMyWebtoonEpisode);
