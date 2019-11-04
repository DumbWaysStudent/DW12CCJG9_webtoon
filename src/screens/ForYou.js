import React, { Component } from 'react';
import { ScrollView, StyleSheet, SafeAreaView, FlatList, TouchableOpacity, View, Modal, AsyncStorage, BackHandler, Alert, Image, Dimensions } from 'react-native';
// import AsyncStorage from '@react-native-community/async-storage';
import { Text, Input, Item, Thumbnail, Button, Card } from 'native-base';
import Icon from "react-native-vector-icons/FontAwesome5";
import Slideshow from 'react-native-image-slider-show';
import SearchSuggestion from '../components/SearchSuggestion';
import { connect } from 'react-redux'
import * as actionWebtoon from './../redux/actions/actionWebtoon'
import * as actionFavourite from './../redux/actions/actionFavourite'
import * as actionProfile from './../redux/actions/actionProfile'
import SpinIcon from './../components/SpinIcon'
import Axios from 'axios';


class ForYou extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchValue: '',
      searchItem: [],
      searchItemVisible: false,
      position: 1,
      interval: null,
      modalVisible: false,
      dataSource: [
        {
          url: require('../assets/images/gif/Preload1.gif')
        },
        {
          url: require('../assets/images/gif/Preload1.gif')
        },
        {
          url: require('../assets/images/gif/Preload1.gif')
        }
      ],
      favouriteData: [
        {
          webtoonId: {
            id: 1
          }
        },
        {
          webtoonId: {
            id: 1
          }
        },
      ],
      listAllToonData: [
        {
          title: '.....',
          preload: require('../assets/images/gif/Preload1.gif')
        },
        {
          title: '.....',
          preload: require('../assets/images/gif/Preload1.gif')
        },
        {
          title: '.....',
          preload: require('../assets/images/gif/Preload1.gif')
        }

      ],
      popularWebtoonData: [
        {
          title: '.....',
          preload: require('../assets/images/gif/Preload1.gif')
        },
        {
          title: '.....',
          preload: require('../assets/images/gif/Preload1.gif')
        },
        {
          title: '.....',
          preload: require('../assets/images/gif/Preload1.gif')
        }
      ],
      // enableScrollViewScroll: true
      sigInData: null
    };
  }

  handleBackPress() {
    Alert.alert(
      'Exit App',
      'Exiting the application?', [{
        text: 'Cancel',
        style: 'cancel'
      }, {
        text: 'OK',
        onPress: () => BackHandler.exitApp()
      }], {
      cancelable: false
    }
    )
    return true
  }

  componentDidMount() {
    AsyncStorage.getItem('sigInData', (err, res) => {
      if (!err) {
        if (res == null) {
          this.props.navigation.navigate('SignIn');
        } else {
          // store sig in data to local state
          this.setState({
            sigInData: JSON.parse(res)
          })

          // load data from redux store
          this.props.handleGetWebtoons(this.state.sigInData.token)
          if (this.props.localWebtoons.isLoading) {

          } else if (this.props.localWebtoons.isSuccess) {

          }
          this.props.handleGetChoicesWebtoons(this.state.sigInData.token)
          this.props.handleGetPopularWebtoons(this.state.sigInData.token)
          this.props.handleGetMyFavourite({
            token: this.state.sigInData.token,
            userID: this.state.sigInData.id
          })

          this.setState({
            searchItem: this.props.localWebtoons.webtoons
          })

          // this.props.handleGetProfileImage(this.state.sigInData.id)
          // this.props.handleGetProfileName(this.state.sigInData.id)

        }
      } else {
        alert('Error While Load Data From LocalStorage')
      }
    })

    this.backHandler = BackHandler.addEventListener('hardwareBackPress', this.handleBackPress)

    this.setState({
      interval: setInterval(() => {
        this.setState({
          position: this.state.position === this.state.dataSource.length - 1 ? 0 : this.state.position + 1
        });
      }, 2000)
    });
  }

  componentWillUnmount() {
    clearInterval(this.state.interval);
    this.backHandler.remove()

  }

  setModalVisible(visible) {
    this.setState({
      modalVisible: visible
    })
  }

  // onEnableScroll(value) {
  //   this.setState({enableScrollViewScroll: value})
  // }

  shortingTitle(str, limit) {
    if (str.length > limit) {
      str = str.slice(0, limit) + '...'
    }

    return str
  }

  addFavourite(webtoon_id) {
    this.props.handleAddMyFavourite({
      userID: this.state.sigInData.id,
      webtoonID: webtoon_id,
      token: this.state.sigInData.token
    })
    // Axios({
    //   method: 'post',
    //   url: 'http://192.168.0.35:5320/api/v1/user/' + this.state.sigInData.id + '/webtoon/' + webtoon_id + '/favourite',
    //   headers: {
    //     'Authorization': this.state.sigInData.token
    //   }
    // })
    //   .then((response) => {
    //     this.props.handleGetMyFavourite({
    //       token: this.state.sigInData.token,
    //       userID: this.state.sigInData.id
    //     })
    //   })
    //   .catch(err => console.log(err));
  }

  favouriteIdMatcher(webtoonId) {
    if (this.props.localFavourites.favourites) {
      if (this.props.localFavourites.favourites.findIndex((x) => x.webtoonId.id == webtoonId) !== -1) {
        return false;
      } else {
        return true;
      }
    } else {
      return false;
    }
  }

  searchFilter(text) {
    if (text == '') {
      this.setState({
        searchItemVisible: false
      })
    } else {
      this.setState({
        searchItemVisible: true
      })
    }
    const newData = this.props.localWebtoons.webtoons.filter(item => {
      const itemData = `${item.title.toUpperCase()}`

      const textData = text.toUpperCase();
      return itemData.indexOf(textData) > -1;
    });

    this.setState({
      searchItem: newData,
      searchValue: text
    });
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <Modal animationType="none"
          transparent={true}
          visible={(this.props.localWebtoons.isLoading && this.props.localFavourites.isLoading)}
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
        <Item style={styles.appTitleContainer}>
            <Image style={styles.appTitleLogo} source={require('../assets/images/logo/smokeLogo.png')} />
            <Text style={styles.appTitle}>SMOKETOON</Text>
            <Icon
              onPress={() => this.setModalVisible(true)}
              name="search"
              size={20}
              style={styles.searchIcon}
            />
          </Item>
          <Modal
            animationType="slide"
            transparent={false}
            visible={this.state.modalVisible}
            onRequestClose={() => {
              this.setModalVisible(false)
            }}
            style={{ backgroundColor: 'red' }}
          ><View style={styles.searchModal}>
              <Item style={styles.searchBox}>
                <Input
                  value={this.state.searchValue}
                  placeholder="Search Your Webtoon..."
                  placeholderTextColor="#888"
                  style={styles.searchBoxInput}
                  onChangeText={(text) => this.searchFilter(text)}
                />
                <Icon
                  onPress={() => this.setModalVisible(false)}
                  name="times"
                  size={20}
                  style={styles.searchBoxIcon}
                />
              </Item>
              <View style={styles.searchBarBottomBorder}></View>
              <View style={styles.searchSuggestionContainer}>
                <FlatList
                  showsHorizontalScrollIndicator={false}
                  data={this.state.searchItem}
                  renderItem={({ item }) =>
                    <TouchableOpacity onPress={() => {
                      this.setModalVisible(false)
                      this.props.navigation.navigate('DetailWebtoon', this.state.searchItem[item.id - 1])
                    }}>
                      <Card style={
                        (this.state.searchItemVisible)
                          ? [styles.listofSearchData, styles.listofSearchDataShow]
                          : styles.listofSearchData}>
                        <Thumbnail source={{ uri: item.image }} style={styles.searchDataImage} square />
                        <View>
                          <Text style={styles.searchDataTitle}>{item.title}</Text>
                          <Text style={styles.searchDataFavCount}>Favourite: {item.favourite_count} Users</Text>
                        </View>
                      </Card>
                    </TouchableOpacity>
                  }
                  keyExtractor={item => item.id}
                />
              </View>
            </View>
          </Modal>
        {/* {(this.props.localWebtoons.isError && this.props.localFavourites.isError) ? alert("Can't load data, please check your internet connection") : console.log('')} */}
        <ScrollView>
          <View style={styles.bannerContainer}>
            <Slideshow
              titleStyle={{ color: '#fff', fontFamily: 'KOMIKAHB' }}
              arrowSize={0}
              containerStyle={{ borderRadius: 10 }}
              height={178}
              dataSource={
                this.props.localWebtoons.choicesWebtoons
                  ? this.props.localWebtoons.choicesWebtoons
                  : this.state.dataSource}
              position={this.state.position}
              onPositionChanged={position => this.setState({ position })} />
          </View>
          <Item style={styles.favoriteBannerList}>
            <Text style={styles.favoriteBannerTitle}><Icon name="star" /> Favourite</Text>
            <FlatList
              showsHorizontalScrollIndicator={false}
              data={
                this.props.localWebtoons.popularWebtoons
                  ? this.props.localWebtoons.popularWebtoons
                  : this.state.popularWebtoonData}
              renderItem={({ item }) =>
                <Card style={styles.favoriteBannerItem}>
                  <TouchableOpacity onPress={() => this.props.navigation.navigate('DetailWebtoon', this.props.localWebtoons.popularWebtoons[item.id - 1])}>
                    <Thumbnail source={
                      (item.hasOwnProperty('image'))
                        ? { uri: `${item.image}` }
                        : item.preload
                    }
                      style={styles.favoriteBannerItemImage}
                      square
                    />
                  </TouchableOpacity>
                  <Text style={styles.favoriteBannerItemTitle}>{this.shortingTitle(item.title, 15)}</Text>
                </Card>
              }
              keyExtractor={item => item.id}
              horizontal={true}
            />
          </Item>
          <Item style={styles.listAllToon}>
            <Text style={styles.listAllToonTitle}><Icon name="list" /> All</Text>
            <FlatList
              // onTouchStart={() =>  {
              //   this.onEnableScroll(false)
              // }}

              // onMomentumScrollEnd={()=>{
              //   this.onEnableScroll(true)
              // }}
              // style={{flex: 1}}
              style={{ width: '100%' }}
              showsVerticalScrollIndicator={false}
              data={
                this.props.localWebtoons.webtoons
                  ? this.props.localWebtoons.webtoons
                  : this.state.listAllToonData}
              renderItem={({ item }) =>
                <Card style={styles.listAllToonItem}>
                  <Thumbnail source={(item.hasOwnProperty('image')) ? { uri: `${item.image}` } : item.preload} style={styles.listAllToonItemImage} square />
                  <Item style={styles.listAllToonItemTB}>
                    <Text
                      onPress={() => this.props.navigation.navigate('DetailWebtoon', this.props.localWebtoons.webtoons[item.id - 1])}
                      style={styles.listAllToonItemTitle}>
                      {item.title}
                    </Text>
                    <Button
                      onPress={() => this.addFavourite(item.id)}
                      disabled={this.favouriteIdMatcher(item.id) ? false : true}
                      style={
                        this.favouriteIdMatcher(item.id)
                          ? styles.favouritePlusBtn
                          : styles.favouritePlusBtnDisabled
                      }>
                      <Text style={{ fontSize: 12, textTransform: 'capitalize' }}>
                        <Icon name="plus" size={10} /> Favourite
                      </Text>
                    </Button>
                  </Item>
                </Card>
              }
              keyExtractor={item => item.id}
            />
          </Item>
        </ScrollView>
      </SafeAreaView>
    )
  }
}

const mapStateToProps = state => {
  return {
    localWebtoons: state.webtoons,
    localFavourites: state.favourites,
    localProfile: state.profile
  }
}

const mapDispatchToProps = dispatch => {
  return {
    // ----------- Webtoons ------------//
    handleGetWebtoons: (token) => dispatch(actionWebtoon.handleGetWebtoons(token)),
    handleGetChoicesWebtoons: (token) => dispatch(actionWebtoon.handleGetChoicesWebtoons(token)),
    handleGetPopularWebtoons: (token) => dispatch(actionWebtoon.handleGetPopularWebtoons(token)),

    // ----------- Favourite ------------//
    handleGetMyFavourite: (params) => dispatch(actionFavourite.handleGetMyFavourite(params)),
    handleAddMyFavourite: (params) => dispatch(actionFavourite.handleAddMyFavourite(params)),
    handleDeleteMyFavourite: (params) => dispatch(actionFavourite.handleDeleteMyFavourite(params)),

    // ----------- Profile  ------------//
    handleGetProfileImage: (userID) => dispatch(actionProfile.handleGetProfileImage(userID)),
    handleGetProfileName: (userID) => dispatch(actionProfile.handleGetProfileName(userID))
  }
}

const {width, height } = Dimensions.get('screen');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#383332'
  },
  searchBox: {
    borderTopWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#444',
    borderRadius: 5,
    marginLeft: 10,
    marginTop: 8,
    marginBottom: 8,
    width: '94%',
    backgroundColor: '#4D4645'
  },
  appTitleContainer: {
    alignSelf: 'center',
    borderTopWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#444',
    borderRadius: 5,
    marginTop: 8,
    marginBottom: 8,
    paddingVertical: 5,
    paddingLeft: 45,
    width: '94%',
    backgroundColor: '#444'
  },
  appTitleLogo: {
    margin: 5,
    width: 30,
    height: 30
  },
  appTitle: {
    borderBottomWidth: 0,
    fontSize: 24,
    fontFamily: 'KOMIKAHB',
    color: '#fff'
  },
  searchIcon: {
    position: 'absolute',
    right: 8,
    color: '#fff',
    padding: 10,
    borderRadius: 8,
    backgroundColor: '#555',
  },
  searchBoxInput: {
    borderBottomWidth: 0,
    paddingLeft: 20,
    fontSize: 12,
    fontFamily: 'KOMIKASL',
    color: '#fff'
  },
  searchBoxIcon: {
    borderRadius: 8,
    backgroundColor: '#555',
    marginHorizontal: 5,
    padding: 10,
    color: '#fff'
  },
  searchModal: {
    flex: 1,
    backgroundColor: '#383332'
  },
  searchBarBottomBorder: {
    borderBottomWidth: 1,
    borderBottomColor: '#232222'
  },
  searchSuggestionContainer: {
    borderTopWidth: 1,
    borderTopColor: '#4D4645'
  },
  bannerContainer: {
    borderTopWidth: 1,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderBottomWidth: 1,
    borderColor: '#444',
    width: '100%',
    height: 180
  },
  bannerImage: {
    borderWidth: 2,
    borderColor: '#444',
  },
  favoriteBannerList: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    borderBottomWidth: 0,
    marginTop: 18,
    marginLeft: 10,
    marginBottom: 10,
    width: '95%'
  },
  favoriteBannerTitle: {
    fontSize: 16,
    color: '#fff',
    // fontWeight: 'bold',
    fontFamily: 'KOMIKAHB'
  },
  favoriteBannerItem: {
    width: 110,
    height: 110,
    marginTop: 10,
    borderRadius: 5
  },
  favoriteBannerItemHide: {
    display: 'none',
    width: 110,
    height: 110,
    marginTop: 10,
    borderRadius: 5
  },
  favoriteBannerItemImage: {
    width: '100%',
    height: '100%',
    marginRight: 10,
    borderRadius: 5
  },
  favoriteBannerItemTitle: {
    fontSize: 10,
    position: 'absolute',
    width: '100%',
    backgroundColor: 'rgba(0,0,0,0.3)',
    color: '#fff',
    textAlign: 'center',
    bottom: 0,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
    fontFamily: 'KOMIKAH_'
  },
  listAllToon: {
    alignItems: 'flex-start',
    flexDirection: 'column',
    borderBottomWidth: 0,
    marginTop: 6,
    marginLeft: 10,
  },
  listAllToonTitle: {
    fontSize: 18,
    fontFamily: 'KOMIKAHB',
    color: '#fff',
    marginBottom: 10,
    marginLeft: 5
  },
  listAllToonItem: {
    backgroundColor: '#444',
    borderWidth: 0,
    borderColor: '#444',
    flexDirection: 'row',
    marginTop: 5,
    borderRadius: 5,
    width: '80%'
  },
  listAllToonItemTitle: {
    fontSize: 12,
    color: '#fff',
    marginBottom: 10,
    fontFamily: 'KOMIKAH_'
  },
  listAllToonItemImage: {
    width: 80,
    height: 80,
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
    marginRight: 10,
  },
  listAllToonItemTB: {
    position: 'absolute',
    top: 10,
    left: 90,
    flexDirection: 'column',
    alignItems: 'flex-start',
    borderBottomWidth: 0
  },
  favouritePlusBtn: {
    marginTop: 5,
    height: 30,
    backgroundColor: '#ee7a33'
  },
  favouritePlusBtnDisabled: {
    marginTop: 5,
    height: 30,
    backgroundColor: '#bb7a33'
  },
  searchDataTitle: {
    padding: 6,
    fontSize: 14,
    color: '#fff',
    marginBottom: 0,
    fontFamily: 'KOMIKAH_'
  },
  listofSearchData: {
    display: 'none',
    backgroundColor: '#444',
    borderWidth: 0,
    borderColor: '#444',
    flexDirection: 'row',
    marginTop: 5,
    marginLeft: 10,
    borderRadius: 5,
    width: '80%'
  },
  listofSearchDataShow: {
    display: 'flex'
  },
  searchDataImage: {
    width: 80,
    height: 80,
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
    marginRight: 10,
  },
  searchDataFavCount: {
    color: '#777',
    fontSize: 10,
    fontFamily: 'KOMIKAH_'
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ForYou);