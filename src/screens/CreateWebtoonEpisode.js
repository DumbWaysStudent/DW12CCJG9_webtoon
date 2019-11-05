import React, { Component } from 'react';
import { View, StyleSheet, SafeAreaView, TouchableOpacity, FlatList, TextInput, AsyncStorage } from 'react-native';
import { Text, Thumbnail, Item, Button } from 'native-base'
import Icon from "react-native-vector-icons/FontAwesome5";
import ImagePicker from 'react-native-image-picker';
import { connect } from 'react-redux';
import * as actionEpisode from './../redux/actions/actionEpisode';
import * as actionWebtoon from './../redux/actions/actionWebtoon';
import * as actionImage from './../redux/actions/actionImage';
import Axios from 'axios';
import { API_URL } from './../services/rest-api';

class CreateWebtoonEpisode extends Component {
  constructor(props) {
    super(props);
    this.state = {
      titleValue: '',
      signInData: null,
      uploadImages: [],
      images: [],
      episode_id: 0
    };
  }

  componentDidMount() {
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
          // Axios({
          //   method: 'get',
          //   url: 'http://192.168.0.35:5320/api/v1/webtoon/episode/id',
          //   headers: {
          //     Authorization: this.state.signInData.token
          //   }
          // })
          //   .then(result => {
          //     this.setState({
          //       episode_id: result.data[0].id
          //     })
          //   })
          //   .catch(err => {
          //     console.log(err)
          //   })
        }
      } else {
        alert('Error While Load Data From LocalStorage')
      }
    })
  }

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
        let upldImgs = this.state.uploadImages

        upldImgs.push({
          page: images.length + 1,
          uri: response.uri,
          type: response.type,
          name: response.fileName
        })

        images.push({
          // id_episode: (this.props.navigation.getParam('currEpisode') != false)
          //   ? this.props.navigation.getParam('currEpisode')[this.props.navigation.getParam('currEpisode').length - 1].id + 1
          //   : (this.state.episode_id > 0) ? this.state.episode_id + 1 : this.state.episode_id,
          page: images.length + 1,
          image: response.uri,
          webtoon_id: this.props.localWebtoons.webtoons[this.props.localWebtoons.webtoons.length - 1].id,
          created_by: (this.state.sigInData !== null) ? this.state.signInData.id : this.state.signInData
        });

        this.setState({
          images: images
        })

      }
    })
  }

  deleteImageHandle(page) {
    let newItem = this.state.images.filter(item => item.page != page)
    let newItem2 = this.state.uploadImages.filter(item => item.page != page)

    this.setState({
      images: newItem,
      uploadImages: newItem2
    })
  }

  // uploadArrTest = () => {
  //   let formData = new FormData();
  //   for (let i = 0; i < this.state.uploadImages.length; i++) {
  //     formData.append('pageImages', this.state.uploadImages[i]);
  //   }

  //   console.log(formData  )
  //   Axios({
  //     method: 'post',
  //     url: `${API_URL}/testupload`,
  //     data: formData
  // })
  //   .then(result => {
  //     console.log(result.data)
  //   })
  //   .catch(e => {
  //     // console.log(JSON.stringify(e));
  //   })
  // }

  okBtnHandle(screen) {
    if (this.state.images != false && this.state.titleValue != false) {
      let formData = new FormData();
      if (screen == 'add') {
        formData.append('title', this.state.titleValue)
        for (let i = 0; i < this.state.uploadImages.length; i++) {
          formData.append('pageImages', this.state.uploadImages[i]);
          formData.append('images', JSON.stringify(this.state.images))
        }

        this.props.handleAddEpisode({
          userID: this.state.signInData.id,
          webtoonID: this.props.localWebtoons.webtoons[this.props.localWebtoons.webtoons.length - 1].id,
          data: formData,
          token: this.state.signInData.token
        })
          .then(() => {
            this.props.handleGetEpisodes({
              webtoonID: this.props.localWebtoons.webtoons[this.props.localWebtoons.webtoons.length - 1].id,
              token: this.state.signInData.token
            })

            this.props.navigation.navigate('CreateWebtoon', {
              webtoonCreated: true,
              webtoonID: this.props.localWebtoons.webtoons[this.props.localWebtoons.webtoons.length - 1].id,
              episodes: [
                ...this.props.navigation.getParam('currEpisode'),
                {
                  title: this.state.titleValue,
                  // webtoon_id: this.props.localWebtoons.webtoons[this.props.localWebtoons.webtoons.length - 1].id + 1,
                  // created_by: (this.state.sigInData !== null) ? this.state.signInData.id : this.state.signInData,
                  image: this.state.images[0].image,
                  lastCreated: this.convertDate(new Date()),
                  pages: this.state.images
                }],
              // images: this.state.images.concat((this.props.navigation.getParam('currImage') != false) ? this.props.navigation.getParam('currImage') : [])
            })
          })
          .catch(e => {
            console.log(e)
          })

        // if (this.props.localEpisodes.isSuccess) {

        // }
      } else if (screen == 'edit') {
        formData.append('title', this.state.titleValue)
        for (let i = 0; i < this.state.uploadImages.length; i++) {
          formData.append('pageImages', this.state.uploadImages[i]);
          formData.append('images', JSON.stringify(this.state.images))
        }
        this.props.handleAddEpisode({
          userID: this.state.signInData.id,
          webtoonID: this.props.navigation.getParam('webtoonID'),
          data: formData,
          token: this.state.signInData.token
        })
        .then(() => {
          this.props.handleGetMyWebtoons({
            userID: this.state.signInData.id,
            token: this.state.signInData.token
          })

          this.props.navigation.navigate('EditMyWebtoon', {
            webtoonID: this.props.navigation.getParam('webtoonID'),
            episodes: [
              ...this.props.navigation.getParam('currEpisode'),
              {
                // id: (this.props.navigation.getParam('currEpisode') != false)
                //   ? this.props.navigation.getParam('currEpisode')[this.props.navigation.getParam('currEpisode').length - 1].id + 1
                //   : (this.state.episode_id > 0) ? this.state.episode_id + 1 : this.state.episode_id,
                title: this.state.titleValue,
                // // webtoon_id: this.props.localWebtoons.webtoons[this.props.localWebtoons.webtoons.length - 1].id + 1,
                // // created_by: (this.state.sigInData !== null) ? this.state.signInData.id : this.state.signInData,
                image: this.state.images[0].image,
                lastCreated: this.convertDate(new Date()),
                // pages: this.state.images
              }],
            // images: this.state.images.concat((this.props.navigation.getParam('currImage') != false) ? this.props.navigation.getParam('currImage') : [])
          })
        })
      }
    } else {
      alert('Title cannot be empty & Page must be set')
    }
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>

          <TouchableOpacity onPress={() => this.props.navigation.goBack()} style={styles.headerBackBtn}>
            <Icon name="arrow-left" style={{ color: '#fff' }} size={23} />
          </TouchableOpacity>

          <Text style={styles.headerTitle}>Create Webtoon Episode</Text>

          <TouchableOpacity
            onPress={() => this.okBtnHandle(this.props.navigation.getParam('screenType'))}
            style={styles.headerOkBtn}>
            <Icon name="check" style={{ color: '#fff' }} size={23} />
          </TouchableOpacity>
        </View>
        <View style={styles.createWebtoonEpPallete}>
          <View style={styles.palleteItem}>
            <Text style={styles.palleteItemTitle}>Title </Text>
            <TextInput
              placeholder="Insert Title......"
              placeholderTextColor="#999"
              style={styles.palleteItemInput}
              onChangeText={(text) => this.setState({ titleValue: text })}
            />
          </View>
          <View style={[styles.palleteItem, styles.palleteItemBW, styles.imagesContainer]}>
            <Text style={styles.palleteItemTitle}>Add Image</Text>
            <FlatList
              showsHorizontalScrollIndicator={false}
              data={this.state.images}
              renderItem={({ item, index }) =>
                <Item style={styles.imageItem}>
                  <Thumbnail source={{ uri: item.image }} style={styles.image} square />
                  <View style={styles.imageInfo}>
                    <Text style={styles.imageTitle}>Page {item.page}</Text>
                    <Button
                      onPress={() => this.deleteImageHandle(item.page)}
                      style={styles.imageDeleteBtn}><Text style={styles.imageDeleteText}>Delete</Text>
                    </Button>
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
        </View>
      </SafeAreaView>
    )
  }
}

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
    handleGetEpisodes: (params) => dispatch(actionEpisode.handleGetEpisodes(params)),
    handleAddEpisode: (params) => dispatch(actionEpisode.handleAddEpisode(params)),
    handleDeleteEpisode: (params) => dispatch(actionEpisode.handleDeleteEpisode(params))
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
    borderBottomWidth: 1,
    borderBottomColor: '#232222',
  },
  palleteItemBW: {
    borderBottomWidth: 1,
    borderBottomColor: '#4D4645',
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
  imagesContainer: {
    height: 420,
    marginBottom: 10
  },
  imageItem: {
    width: '100%',
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
    fontWeight: 'bold',
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
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateWebtoonEpisode);
