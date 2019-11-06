import React, { Component } from 'react';
import { View, StyleSheet, SafeAreaView, TouchableOpacity, FlatList, TextInput, ImageBackground, AsyncStorage, Dimensions, Modal } from 'react-native';
import { Text, Thumbnail, Item, Button, Fab, Toast } from 'native-base'
import Icon from "react-native-vector-icons/FontAwesome5";
import { connect } from 'react-redux';
import * as actionWebtoon from './../redux/actions/actionWebtoon';
import * as actionEpisode from './../redux/actions/actionEpisode';
import ImagePicker from 'react-native-image-picker';
import Axios from 'axios'
import { ScrollView } from 'react-native-gesture-handler';
import SpinIcon from './../components/SpinIcon'
import { Image_URL } from './../services/rest-api'
import { concat } from 'rxjs';

class EditMyWebtoon extends Component {
  constructor(props) {
    super(props);
    this.state = {
      titleValue: '',
      genreValue: '',
      preload: require('../assets/images/gif/Preload1.gif'),
      webtoonData: null,
      signInData: null,
      bannerImage: '',
      fabstatus: false,
      listEpisode: [
        // {
        //   id: 1,
        //   title: 'Ep.1',
        //   image: require('../assets/images/14587286205684423455.jpg'),
        //   lastUpdate: '1 Januari 2019'
        // }
      ]
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
            signInData: JSON.parse(res),
            titleValue: this.props.navigation.getParam('title'),
            genreValue: this.props.navigation.getParam('genre'),
            // bannerImage: this.props.navigation.getParam('image')
          })

          // Axios({
          //   method: 'get',
          //   url: `http://192.168.0.35:5320/api/v1/webtoon/${this.props.navigation.getParam('id')}/episodes`,
          //   headers: {
          //     Authorization: this.state.signInData.token
          //   }
          // })
          //   .then(result => {
          //     this.setState({
          //       listEpisode: result.data
          //     })
          //   })
          //   .catch(err => {
          //     console.log(err)
          //   })

          this.props.handleGetEpisodes({
            webtoonID: this.props.navigation.getParam('id'),
            token: this.state.signInData.token
          })
          .then(() => {})
          .catch((e) => {
            this.toastGenerator('error', "Error: Can't load episodes data")
          })
        }
      } else {
        this.toastGenerator('error', "Error: Can't load data from localStorage")
      }
    })
  }


  imagePickerHandler() {
    const options = {
      title: 'Select Banner',
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
          bannerImage: source,
        })
      }
    })
  }

  okBtnHandle() {
    let
      { title, genre, image, id } = this.props.navigation.state.params,
      { titleValue, genreValue, bannerImage } = this.state;
    if (titleValue != title || genreValue != genre || bannerImage.uri != image) {
      let formData = new FormData();
      formData.append('title', this.state.titleValue)
      formData.append('genre', this.state.genreValue)
      formData.append('banner', this.state.bannerImage)

      this.props.handleUpdateWebtoon({
        userID: this.state.signInData.id,
        webtoonID: id,
        payload: formData,
        token: this.state.signInData.token
      })
        .then(() => {
          this.toastGenerator('success', "Update my webtoon success")
          this.props.navigation.goBack()
        })
        .catch(e => {
          this.toastGenerator('error', "Error: Can't update my webtoon")
        })
      // this.props.handleUpdateWebtoon({
      //   userID: this.state.signInData.id,
      //   webtoonID: id,
      //   payload: {
      //     title: titleValue,
      //     genre: genreValue,
      //     image: bannerImage.uri,
      //   },
      //   token: this.state.signInData.token
      // })
      // .then(() => {
      //   this.props.navigation.goBack()
      // })
      // } else if (titleValue != title && genreValue != genre) {
      //   this.props.handleUpdateWebtoon({
      //     userID: this.state.signInData.id,
      //     webtoonID: id,
      //     payload: {
      //       title: titleValue,
      //       genre: genreValue,
      //     },
      //     token: this.state.signInData.token
      //   })
      //   .then(() => {
      //     this.props.navigation.goBack()
      //   })
      // } else if (genreValue != genre && bannerImage.uri != image) {
      //   this.props.handleUpdateWebtoon({
      //     userID: this.state.signInData.id,
      //     webtoonID: id,
      //     payload: {
      //       genre: genreValue,
      //       image: bannerImage.uri,
      //     },
      //     token: this.state.signInData.token
      //   })
      //   .then(() => {
      //     this.props.navigation.goBack()
      //   })
      // } else if (titleValue != title && bannerImage.uri != image) {
      //   this.props.handleUpdateWebtoon({
      //     userID: this.state.signInData.id,
      //     webtoonID: id,
      //     payload: {
      //       title: titleValue,
      //       image: bannerImage.uri,
      //     },
      //     token: this.state.signInData.token
      //   })
      //   .then(() => {
      //     this.props.navigation.goBack()
      //   })
      // } else if (titleValue != title) {
      //   this.props.handleUpdateWebtoon({
      //     userID: this.state.signInData.id,
      //     webtoonID: id,
      //     payload: {
      //       title: titleValue
      //     },
      //     token: this.state.signInData.token
      //   })
      //   .then(() => {
      //     this.props.navigation.goBack()
      //   })
      // } else if (genreValue != genre) {
      //   this.props.handleUpdateWebtoon({
      //     userID: this.state.signInData.id,
      //     webtoonID: id,
      //     payload: {
      //       genre: genreValue
      //     },
      //     token: this.state.signInData.token
      //   })
      //   .then(() => {
      //     this.props.navigation.goBack()
      //   })
      // } else if (bannerImage.uri != image) {
      //   this.props.handleUpdateWebtoon({
      //     userID: this.state.signInData.id,
      //     webtoonID: id,
      //     payload: {
      //       image: bannerImage.uri,
      //     },
      //     token: this.state.signInData.token
      //   })
      //   .then(() => {
      //     this.props.navigation.goBack()
      //   })
    } else {
      this.toastGenerator('error', "Nothing Changed")
    }

  }

  addEpisode() {
    if (this.state.titleValue != '' && this.state.genreValue != '' && this.state.bannerImage != require('../assets/images/gif/Preload1.gif')) {
      this.props.navigation.navigate('CreateWebtoonEpisode', (this.props.navigation.state.params.episodes
        ? {
          currEpisode: this.props.navigation.getParam('episodes'),
          currImage: this.props.navigation.getParam('images'),
          screenType: 'edit',
          webtoonID: this.props.navigation.getParam('id')
        }
        : { currEpisode: this.props.localEpisodes.episodes, screenType: 'edit', webtoonID: this.props.navigation.getParam('id') }
      ))
    } else {
      this.toastGenerator('error', "Title, Genre cannot be empty & Banner must be set!")
    }
  }

  deleteWebtoon() {
    this.props.handleDeleteWebtoon({
      userID: this.state.signInData.id,
      webtoonID: this.props.navigation.getParam('id'),
      token: this.state.signInData.token
    })
    .then(() => {
      if (this.props.localWebtoons.isSuccess) {
        this.toastGenerator('success', "Delete my wbtoon success")
        this.props.navigation.goBack()
      }
    })
    .catch((e) => {
      if (this.props.localWebtoons.isSuccess) {
        this.toastGenerator('error', "Error: Can't delete my webtoon")
        this.props.navigation.goBack()
      }
    })
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
    // console.log(this.props.navigation.state.params)
    return (
      <SafeAreaView style={styles.container}>
        {/* <Modal animationType="none"
          transparent={true}
          visible={(this.props.localEpisodes.isLoading)}
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
        </Modal> */}
        <View style={styles.header}>

          <TouchableOpacity onPress={() => this.props.navigation.navigate('MyWebtoonCreation')} style={styles.headerBackBtn}>
            <Icon name="arrow-left" style={{ color: '#fff' }} size={23} />
          </TouchableOpacity>

          <Text style={styles.headerTitle}>Edit My Webtoon</Text>

          <TouchableOpacity
            onPress={() => this.okBtnHandle()}
            style={styles.headerOkBtn}>
            <Icon name="check" style={{ color: '#fff' }} size={23} />
          </TouchableOpacity>
        </View>
        <ScrollView>
          <View style={styles.createWebtoonPallete}>
            <View style={styles.palleteItem}>
              <Text style={styles.palleteItemTitle}>Title</Text>
              <TextInput
                value={this.state.titleValue}
                placeholder="Insert Genre......"
                placeholderTextColor="#999"
                style={styles.palleteItemInput}
                onChangeText={(text) => this.setState({
                  titleValue: text
                })}
              />
            </View>

            <View style={styles.palleteItem}>
              <Text style={styles.palleteItemTitle}>Genre</Text>
              <TextInput
                value={this.state.genreValue}
                placeholder="Insert Genre......"
                placeholderTextColor="#999"
                style={styles.palleteItemInput}
                onChangeText={(text) => this.setState({
                  genreValue: text
                })}
              />
            </View>
            {/* {console.log(this.state.bannerImage)} */}
            <View style={styles.palleteItem}>
              <Text style={styles.palleteItemTitle}>Banner</Text>
              <ImageBackground style={styles.wtimageBanner} source={(this.state.bannerImage != false) ? this.state.bannerImage : { uri: `${Image_URL}/${this.props.navigation.getParam('image')}` }} />
              <Button onPress={() => this.imagePickerHandler()} style={styles.wtimageBannerChooseBtn}>
                <Text style={styles.wtimageBannerChooseBtnText}>
                  <Icon name="image" size={20} />  Choose File...
                </Text>
              </Button>
            </View>

            <View style={styles.palleteItem}>
              <Text style={styles.palleteItemTitle}>Episode</Text>
              <FlatList
                showsHorizontalScrollIndicator={false}
                data={this.props.localEpisodes.episodes}
                renderItem={({ item }) =>
                  <Item onPress={() => this.props.navigation.navigate('EditMyWebtoonEpisode', { image: item.image , episodeID: item.id, webtoonID: this.props.navigation.getParam('id'), title: item.title })} style={styles.episodeItem}>
                    <Thumbnail source={{ uri: `${Image_URL}/${item.image}` }} style={styles.episodeImage} square />
                    {/* {console.log(item)} */}
                    <View style={styles.episodeInfo}>
                      <Text style={styles.episodeTitle}>{item.title}</Text>
                      <Text style={styles.episodeLastUpade}>{item.lastUpdate}</Text>
                    </View>
                  </Item>
                }
                keyExtractor={item => item.id}
              />
            </View>
          </View>
        </ScrollView>
        <Fab
          active={this.state.fabstatus}
          direction="up"
          style={{ backgroundColor: '#ee7a33' }}
          position="bottomRight"
          onPress={() => this.setState({ fabstatus: !this.state.fabstatus })}>
          <Icon name="ellipsis-v" />
          <Button onPress={() => this.deleteWebtoon()} style={{ backgroundColor: '#ee7a33' }}><Icon name="trash-alt" style={{ color: '#fff' }} /></Button>
          <Button onPress={() => this.addEpisode()} style={{ backgroundColor: '#ee7a33' }}><Icon name="plus" style={{ color: '#fff' }} /></Button>
        </Fab>
      </SafeAreaView>
    )
  }
}

const { width, height } = Dimensions.get('window')

const mapStateToProps = state => {
  return {
    localWebtoons: state.webtoons,
    localEpisodes: state.episodes
  }
}

const mapDispatchToProps = dispatch => {
  return {
    // ----------- Webtoons ------------//
    handleUpdateWebtoon: (params) => dispatch(actionWebtoon.handleUpdateWebtoon(params)),
    handleDeleteWebtoon: (params) => dispatch(actionWebtoon.handleDeleteWebtoon(params)),

    // ----------- Episodes ------------//
    handleGetEpisodes: (params) => dispatch(actionEpisode.handleGetEpisodes(params))
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
  wtimageBanner: {
    width: '100%',
    height: 150,
    borderWidth: 1,
    borderColor: '#444',
    borderRadius: 4,
    marginBottom: 10
  },
  wtimageBannerChooseBtn: {
    width: 150,
    backgroundColor: '#ee7a33',
    borderRadius: 6
  },
  wtimageBannerChooseBtnText: {
    textTransform: 'capitalize',
    alignSelf: 'center',
    fontFamily: 'KOMIKAH_',
    fontSize: 12
  },
  episodeItem: {
    alignItems: 'flex-start',
    borderBottomWidth: 0,
    marginBottom: 15,
  },
  episodeImage: {
    borderWidth: 2,
    borderColor: '#444',
    width: 70,
    height: 70
  },
  episodeInfo: {
    padding: 5,
    marginLeft: 8
  },
  episodeTitle: {
    fontSize: 14,
    color: '#fff',
    fontWeight: 'bold'
  },
  episodeLastUpade: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#999'
  },
  palleteBtn: {
    width: '82%',
    alignSelf: 'center',
    paddingHorizontal: 77,
    backgroundColor: '#ee7a33',
    borderRadius: 6
  },
  palleteBtnRemove: {
    marginTop: 15,
    paddingHorizontal: 58,
    backgroundColor: '#DA2F2B'
  },
  palleteBtnText: {
    alignSelf: 'center',
    textTransform: 'capitalize',
    fontFamily: 'KOMIKAH_'
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
)(EditMyWebtoon);