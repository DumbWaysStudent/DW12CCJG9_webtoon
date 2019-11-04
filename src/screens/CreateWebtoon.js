import React, { Component } from 'react';
import { View, StyleSheet, SafeAreaView, TouchableOpacity, FlatList, TextInput, ImageBackground, AsyncStorage } from 'react-native';
import { Text, Thumbnail, Item, Button } from 'native-base';
import Icon from "react-native-vector-icons/FontAwesome5";
import { connect } from 'react-redux';
import * as actionWebtoon from './../redux/actions/actionWebtoon';
import { ScrollView } from 'react-native-gesture-handler';
import ImagePicker from 'react-native-image-picker';

class CreateWebtoon extends Component {
  constructor(props) {
    super(props);
    this.state = {
      titleValue: '',
      genreValue: '',
      webtoonCreated: false,
      bannerImage: require('../assets/images/gif/Preload1.gif'),
      signInData: null,
      listEpisode: [
        // {
        //   id: 1,
        //   title: 'Ep.1',
        //   image: require('../assets/images/14587286205684423455.jpg'),
        //   lastUpdate: '1 Januari 2019'
        // },
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
            signInData: JSON.parse(res)
          })
        }
      } else {
        alert('Error While Load Data From LocalStorage')
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
          bannerImage: source,
        })
      }
    })
  }

  addEpisode() {
    if (this.state.titleValue != '' && this.state.genreValue != '' && this.state.bannerImage != require('../assets/images/gif/Preload1.gif')) {
      if ((this.props.navigation.state.params ? this.props.navigation.getParam('webtoonCreated') : this.state.webtoonCreated) == false) {
        this.props.handleAddWebtoon({
          userID: this.state.signInData.id,
          title: this.state.titleValue,
          genre: this.state.genreValue,
          image: this.state.bannerImage.uri,
          token: this.state.signInData.token
        })

        this.setState({
          webtoonCreated: true
        })
      }

      this.props.navigation.navigate('CreateWebtoonEpisode', (
        this.props.navigation.state.params
        ? {
          currEpisode: this.props.navigation.getParam('episodes'),
          currImage: this.props.navigation.getParam('images'),
          screenType: 'add',
          webtoonCreated: this.state.webtoonCreated
        }
        : { currEpisode: [], screenType: 'add', webtoonCreated: this.state.webtoonCreated }
      ))
    } else {
      alert('Title, Genre cannot be empty & Banner must be set!')
    }
  }

  goBackValidator() {
    if (this.props.navigation.state.params) {
      this.props.handleDeleteWebtoon({
        userID: this.state.signInData.id,
        webtoonID: this.props.navigation.getParam('webtoonID'),
        token: this.state.signInData.token
      })
    }

    if (this.props.localWebtoons.isSuccess) {
      this.props.navigation.goBack()
    }
  }

  createWebtoonConfirm() {
    // console.log('DATA', this.props.navigation.getParam('images'))
    // let data = {
    //   webtoonTitle: this.state.titleValue,
    //   episodes: this.props.navigation.getParam('episodes_data')
    // }

    if (this.state.titleValue != false && this.state.genreValue != false) {
      if (this.props.navigation.state.params) {
        //   this.props.navigation.getParam('images').pop()
        //   this.props.handleAddWebtoon({
        //     userID: this.state.signInData.id,
        //     title: this.state.titleValue,
        //     genre: this.state.genreValue,
        //     image: this.state.bannerImage.uri,
        //     token: this.state.signInData.token,
        //     childData: {
        //       episodes: this.props.navigation.getParam('episodes'),
        //       images: this.props.navigation.getParam('images')
        //     }
        //   })
        this.props.handleAddMyWebtoon({
          userID: this.state.signInData.id,
          webtoonID: this.props.navigation.getParam('webtoonID'),
          token: this.state.signInData.token
        })
        if (this.props.localWebtoons.isSuccess) {
          this.props.navigation.goBack()
        }
      } else {
        alert('Episode must be set!')
      }
    } else {
      alert('Title & Genre cannot be empty')
    }
  }

  render() {
    // console.log(this.props.navigation.getParam('images'))
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>

          <TouchableOpacity onPress={() => this.goBackValidator()} style={styles.headerBackBtn}>
            <Icon name="arrow-left" style={{ color: '#fff' }} size={23} />
          </TouchableOpacity>

          <Text style={styles.headerTitle}>Create Webtoon</Text>

          <TouchableOpacity
            onPress={() => this.createWebtoonConfirm()}
            style={styles.headerOkBtn}>
            <Icon name="check" style={{ color: '#fff' }} size={23} />
          </TouchableOpacity>
        </View>
        <ScrollView style={{ width: '100%', height: '100%' }}>
          <View style={styles.createWebtoonPallete}>
            <View style={styles.palleteItem}>
              <Text style={styles.palleteItemTitle}>Title</Text>
              <TextInput
                placeholder="Insert Title......"
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
                placeholder="Insert Genre......"
                placeholderTextColor="#999"
                style={styles.palleteItemInput}
                onChangeText={(text) => this.setState({
                  genreValue: text
                })}
              />
            </View>

            <View style={styles.palleteItem}>
              <Text style={styles.palleteItemTitle}>Banner</Text>
              <ImageBackground style={styles.wtimageBanner} source={this.state.bannerImage} />
              <Button onPress={() => this.imagePickerHandler()} style={styles.wtimageBannerChooseBtn}>
                <Text style={styles.wtimageBannerChooseBtnText}>
                  <Icon name="image" size={20} />  Choose File...
                </Text>
              </Button>
            </View>

            <View style={[styles.palleteItem, styles.palleteItemBW, styles.episodesContainer]}>
              <Text style={styles.palleteItemTitle}>Episode</Text>
              <FlatList
                showsHorizontalScrollIndicator={false}
                data={(this.props.navigation.state.params) ? this.props.localEpisodes.episodes : this.state.listEpisode}
                renderItem={({ item, index }) =>
                  <Item onPress={() => this.props.navigation.navigate('EditMyWebtoonEpisode', {
                    webtoonID: this.props.navigation.getParam('webtoonID'),
                    episodeID: item.id
                  })} style={styles.episodeItem}>
                    <Thumbnail source={{ uri: item.image }} style={styles.episodeImage} square />
                    <View style={styles.episodeInfo}>
                      <Text style={styles.episodeTitle}>{item.title}</Text>
                      <Text style={styles.episodeLastUpade}>{item.lastCreated}</Text>
                    </View>
                  </Item>
                }
                keyExtractor={item => item.id}
              />
            </View>
          </View>
        </ScrollView>
        <Button style={styles.palleteBtn} onPress={() => this.addEpisode()}>
          <Text style={styles.palleteBtnText}>
            <Icon name="plus" /> Add Episode
          </Text>
        </Button>
      </SafeAreaView>
    )
  }
}

const mapStateToProps = state => {
  return {
    localWebtoons: state.webtoons,
    localEpisodes: state.episodes
  }
}

const mapDispatchToProps = dispatch => {
  return {
    // ----------- Webtoons ------------//
    handleAddWebtoon: (params) => dispatch(actionWebtoon.handleAddWebtoon(params)),
    handleAddMyWebtoon: (params) => dispatch(actionWebtoon.handleAddMyWebtoon(params)),
    handleDeleteWebtoon: (params) => dispatch(actionWebtoon.handleDeleteWebtoon(params))
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#383332',
    paddingBottom: 15
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
  episodesContainer: {
    // height: 170,
    // marginBottom: 10
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
    // position: 'absolute',
    marginTop: 10,
    width: '82%',
    alignSelf: 'center',
    paddingHorizontal: 77,
    backgroundColor: '#ee7a33',
    borderRadius: 6
  },
  palleteBtnText: {
    textTransform: 'capitalize',
    alignSelf: 'center',
    fontFamily: 'KOMIKAH_'
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateWebtoon);