import React, { Component } from 'react';
import { ScrollView, StyleSheet, SafeAreaView, FlatList, TouchableOpacity, View, Modal} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {Text, Input, Item, Thumbnail, Button, Card} from 'native-base';
import Icon from "react-native-vector-icons/FontAwesome5";
import Slideshow from 'react-native-image-slider-show';
import Axios from 'axios';
import SearchSuggestion from '../components/SearchSuggestions';


class ForYou extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchValue: '',
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
        // {
        //   id: 2,
        //   title: 'Dr Frost',
        //   seriesID: '01',
        //   image: require('../assets/images/dr-frost.jpg'),
        //   prevScreen: 'ForYou'
        // },
        // {
        //   id: 3,
        //   title: 'Nobleese Awakening',
        //   seriesID: '01',
        //   image: require('../assets/images/noblesse-awakening.jpg'),
        //   prevScreen: 'ForYou'
        // },
        // {
        //   id: 4,
        //   title: 'Girls Of The Wild',
        //   seriesID: '01',
        //   image: require('../assets/images/girls-of-the-wild.png'),
        //   prevScreen: 'ForYou'
        // },
        // {
        //   id: 5,
        //   title: "Melvina's Theraphy",
        //   seriesID: '01',
        //   image: require('../assets/images/melvinas-therapy.jpg'),
        //   prevScreen: 'ForYou'
        // },
        // {
        //   id: 6,
        //   title: "Siren's Lament",
        //   seriesID: '01',
        //   image: require('../assets/images/sirens-lament.jpg'),
        //   prevScreen: 'ForYou'
        // },
        // {
        //   id: 7,
        //   title: "Winter Woods",
        //   seriesID: '01',
        //   image: require('../assets/images/winter-woods.jpg'),
        //   prevScreen: 'ForYou'
        // },
        
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

  componentDidMount() {
    AsyncStorage.getItem('sigInData', (err, res) => {
      if (!err){
        if (res == null) {
          this.props.navigation.navigate('SignIn');
        } else {
          
          this.setState({
            sigInData: JSON.parse(res)
          })
          this.getAllData()
        }
      } else {
        console.log(err)
      }
    })
  }

  UNSAFE_componentWillMount() {
    this.setState({
      interval: setInterval(() => {
        this.setState({
          position: this.state.position === this.state.dataSource.length - 1 ? 0 : this.state.position + 1
        });
      }, 2000)
    });
  }

  UNSAFE_componentWillUnmount() {
    clearInterval(this.state.interval);
  }

  setModalVisible(visible) {
    this.setState({
      modalVisible: visible
    })
  }

  // onEnableScroll(value) {
  //   this.setState({enableScrollViewScroll: value})
  // }

  getAllData() {
    if(this.state.sigInData != null) {
      // console.log(this.state.sigInData.token) 
      Axios({
        method: 'get',
          url: 'http://192.168.0.35:5320/api/v1/webtoons',
          headers: {
            'Authorization': this.state.sigInData.token
          }
      })
      .then((response) => {
        this.setState({
          listAllToonData: response.data
        })
      })
      .catch(err => console.log(err))
      // console.log(this.state.sigInData.user)
      Axios({
        method: 'get',
        url: 'http://192.168.0.35:5320/api/v1/user/' + this.state.sigInData.id + '/webtoons/favourite',
        headers: {
          'Authorization': this.state.sigInData.token
        }
      })  
      .then((response) => {
        this.setState({
          favouriteData: response.data
        })
        // console.log(this.state.favouriteData[0].webtoonId.title)
      })
      .catch(err => console.log(err))

      Axios({
        method: 'get',
        url: 'http://192.168.0.35:5320/api/v1/webtoons/choices/',
        headers: {
          'Authorization': this.state.sigInData.token
        }
      })  
      .then((response) => {
        this.setState({
          dataSource: response.data
        })
        // console.log(this.state.favouriteData[0].webtoonId.title)
      })
      .catch(err => console.log(err))

      Axios({
        method: 'get',
        url: 'http://192.168.0.35:5320/api/v1/webtoons/popular',
        headers: {
          'Authorization': this.state.sigInData.token
        }
      })  
      .then((response) => {
        // console.log(response.data[0])
        this.setState({
          popularWebtoonData: response.data
        })
        // console.log(this.state.favouriteData[0].webtoonId.title)
      })
      .catch(err => console.log(err))
    }
  }

  shortingTitle(str, limit) {
    if (str.length > limit) {
      str = str.slice(0, limit) + '...'
    }

    return str
  }

  favouriteBtnChanger(action, webtoon_id, favourite_id) {
    console.log(webtoon_id)
    if (action == 'addfavourite') {
      Axios({
        method: 'post',
        url: 'http://192.168.0.35:5320/api/v1/user/' + this.state.sigInData.id + '/webtoon/' + webtoon_id + '/favourite',
        headers: {
          'Authorization': this.state.sigInData.token
        }
      })  
      .then((response) => {
        alert('Favourited!');
      })
      .catch(err => console.log(err));

    } else if (action == 'unfavourite') {
      Axios({
        method: 'delete',
        url: 'http://192.168.0.35:5320/api/v1/user/' + this.state.sigInData.id + '/webtoon/' + webtoon_id + '/favourite',
        headers: {
          'Authorization': this.state.sigInData.token
        }
      })  
      .then((response) => {
        alert('UnFavourited!');
      })
      .catch(err => console.log(err));
    }
  }

  favouriteIdMatcher(webtoonId) {
    if (this.state.favouriteData.findIndex((x) => x.webtoonId.id == webtoonId )) {
      return true;
    } else {
      return false;
    }
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView>
          <Item style={styles.searchBox}>
              <Input onFocus={() => this.setModalVisible(true)} placeholder="Search Your Webtoon..." placeholderTextColor="#888" style={styles.searchBoxInput}/>
              <Icon
                name="search"
                size={20}
                style={styles.searchBoxIcon}
              />
          </Item>
          <Modal
            animationType="slide"
            transparent={false}
            visible={this.state.modalVisible}
            onRequestClose={() => {
              this.setModalVisible(false)
            }}>
              <Item style={styles.searchBox}>
                <Input
                  value={this.state.searchValue}
                  placeholder="Search Your Webtoon..."
                  placeholderTextColor="#888"
                  style={styles.searchBoxInput}
                  onChangeText={(text) => this.setState({
                    searchValue: text
                  }) }
                  />
                <Icon
                  name="search"
                  size={20}
                  style={styles.searchBoxIcon}
                />
              </Item>
              <Item>
                <SearchSuggestion results={this.state.listAllToonData}  />
              </Item>
              </Modal>
          <View style={styles.bannerContainer}>
          <Slideshow
            titleStyle={{color: '#fff', fontFamily: 'KOMIKAHB'}}
              arrowSize={0}
              containerStyle={{borderRadius: 10}}
              height={178}
              dataSource={this.state.dataSource}
              position={this.state.position}
              onPositionChanged={position => this.setState({ position })} />
          </View>
          <Item style={styles.favoriteBannerList}>
            <Text style={styles.favoriteBannerTitle}><Icon name="star" /> Favourite</Text>
            <FlatList
            showsHorizontalScrollIndicator={false}
            data={this.state.popularWebtoonData}
            renderItem={({ item }) =>
              <Card style={styles.favoriteBannerItem}>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('DetailWebtoon', this.state.popularWebtoonData[item.id - 1]) }>
                  <Thumbnail source={
                      (item.hasOwnProperty('image'))
                      ? {uri: `${item.image}`}
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
            style={{width: '100%'}}
            showsVerticalScrollIndicator={false}
            data={this.state.listAllToonData}
            renderItem={({ item }) =>
              <Card style={styles.listAllToonItem}>
                <Thumbnail source={(item.hasOwnProperty('image')) ? {uri: `${item.image}`} : item.preload} style={styles.listAllToonItemImage} square />
                <Item style={styles.listAllToonItemTB}>
                  {console.log(item.id)}
                  <Text
                    onPress={() => this.props.navigation.navigate('DetailWebtoon', this.state.listAllToonData[item.id - 1]) }
                    style={styles.listAllToonItemTitle}>
                      {item.title}
                  </Text>
                  <Button
                    onPress={()=> (this.favouriteIdMatcher(item.id) ? this.favouriteBtnChanger('addfavourite', item.id) : this.favouriteBtnChanger('unfavourite', item.id))}
                    disabled={item.hasOwnProperty('preload') ? true : false}
                    style={
                      item.hasOwnProperty('preload') 
                      ? styles.favouritePlusBtnDisabled
                      : styles.favouritePlusBtn
                    }>
                    <Text style={{fontSize: 12, textTransform: 'capitalize'}}>
                      <Icon name={this.favouriteIdMatcher(item.id) ? 'plus' : 'minus'} size={10} /> 
                      {(this.favouriteIdMatcher(item.id) ? ' Favourite' : ' UnFavourite')}
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
    searchBoxInput: {
        borderBottomWidth: 0,
        paddingLeft: 20,
        fontSize: 12,
        fontFamily: 'KOMIKASL',
        color: '#fff'
    },
    searchBoxIcon: {
      paddingVertical: 15,
      paddingHorizontal:12,
      borderLeftWidth: 1,
      borderLeftColor: '#444',
      color: '#fff'
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
    listAllToonItemTitle: {
      fontSize: 12,
      color: '#fff',
      marginBottom: 10,
      fontFamily: 'KOMIKAH_'
    }
})

export default ForYou;
