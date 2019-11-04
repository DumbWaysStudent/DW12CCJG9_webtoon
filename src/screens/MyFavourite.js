import React, { Component } from 'react';
import { View, FlatList, StyleSheet, SafeAreaView, AsyncStorage} from 'react-native';
import {Button, Text, Input, Form, Label, Item, Card, Content, Thumbnail} from 'native-base'
import Icon from "react-native-vector-icons/FontAwesome5";
import AntDesign from 'react-native-vector-icons/AntDesign';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { connect } from 'react-redux'
import * as actionFavourite from './../redux/actions/actionFavourite'
import Axios from 'axios'

class MyFavourite extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      sigInData: null,
      searchStatus: false,
      data: [],
      error: null
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

          this.setState({
            data: this.props.localFavourites.favourites
          })
          
        }
      } else {
        console.log(err)
      }
    })
  }

  searchFilter(text) {
    if (text != '') {
      this.setState({
        searchStatus: true
      })
    } else {
      this.setState({
        searchStatus: false
      })
    }
    const newData = this.props.localFavourites.favourites.filter(item => {      
      const itemData = `${item.webtoonId.title.toUpperCase()}`
      
       const textData = text.toUpperCase();
        console.log(itemData.indexOf(textData))
       return itemData.indexOf(textData) > -1;    
    });
    
    this.setState({
      data: newData
    })
  }

  deleteFavourite(webtoon_id) {
    var index = this.props.localFavourites.favourites.findIndex((x) => x.webtoonId.id == webtoon_id);
    var favID = this.props.localFavourites.favourites[index].id;
    this.props.handleDeleteMyFavourite({
      userID: this.state.sigInData.id,
      webtoonID: webtoon_id,
      favouriteID: favID,
      token: this.state.sigInData.token
    });
    // var index = this.props.localFavourites.favourites.findIndex((x) => x.webtoonId.id == webtoon_id);
    // var favID = this.props.localFavourites.favourites[index].id;
    // Axios({
    //   method: 'delete',
    //   url: 'http://192.168.0.35:5320/api/v1/user/' + this.state.sigInData.id + '/webtoon/' + webtoon_id + '/favourite/' + favID,
    //   headers: {
    //     'Authorization': this.state.sigInData.token
    //   }
    // })
    //   .then((response) => {
        
    //     alert('UnFavorited!');
    //   })
    //   .catch(err => console.log(err));
  }

  render() {
    // console.log(this.state.data)
    return (
      <SafeAreaView style={styles.container}>
          <Item style={styles.searchBox}>
              <Input
                placeholder="Search Favourite Webtoon..."
                placeholderTextColor="#888"
                style={styles.searchBoxInput}
                onChangeText={text => this.searchFilter(text)}
              />
              <Icon
                name="search"
                size={20}
                style={styles.searchBoxIcon}
              />
          </Item>
          <FlatList
            showsHorizontalScrollIndicator={false}
            data={(this.state.searchStatus) ? this.state.data : this.props.localFavourites.favourites}
            renderItem={({ item }) =>
            <TouchableOpacity onPress={() => this.props.navigation.navigate('DetailWebtoon', this.state.data[item.webtoonId.id - 1])}>
              <Card style={styles.favoriteBannerItem}>
                <Thumbnail source={{uri: item.webtoonId.image}}  style={styles.favoriteBannerItemImage} square />
                <View>
                  <Text style={styles.favoriteBannerTitle}>{item.webtoonId.title}</Text>
                  <Text style={styles.favouriteRating}>Favourite: {item.webtoonId.favourite_count} User</Text>
                  <Button 
                  onPress={() => this.deleteFavourite(item.webtoon_id)}
                  style={styles.favouritePlusBtn}>
                    <Text style={{ fontSize: 12, textTransform: 'capitalize' }}><Icon name="minus" /> UnFavourite</Text>
                  </Button>
                </View>
              </Card>
              </TouchableOpacity>
            }
            keyExtractor={item => item.webtoonId.id}
            />
      </SafeAreaView>
    )
  }
}

const mapStateToProps = state => {
  return {
    localFavourites: state.favourites,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    // ----------- Favourite ------------//
    handleGetMyFavourite: (params) => dispatch(actionFavourite.handleGetMyFavourite(params)),
    handleDeleteMyFavourite: (params) => dispatch(actionFavourite.handleDeleteMyFavourite(params)),
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
      borderTopWidth: 2,
      borderLeftWidth: 2,
      borderRightWidth: 2,
      borderBottomWidth: 2,
      borderColor: '#444',
      borderRadius: 5,
      marginLeft: 10,
      width: '94%',
      height: 180
      // flex: 9
    },
    bannerImage: {
      borderWidth: 2,
      borderColor: '#444',
      width: '100%',
      height: '100%'
    },
    favoriteBannerItem: {
      backgroundColor: '#444',
      borderWidth: 0, 
      borderColor: '#444',
      flexDirection: 'row',
      alignItems: 'flex-start',
      marginTop: 5,
      borderRadius: 5,
      width: '80%',
      alignSelf: 'center'
    },
    favoriteBannerItemImage: {
      width: 80,
      height: 80,
      borderTopLeftRadius: 5,
      borderBottomLeftRadius: 5,
      marginRight: 10,
    },
    favoriteBannerTitle: {
      fontSize: 14,
      color: '#fff',
      fontFamily: 'KOMIKAH_',
      marginTop: 5
    },
    favouriteRating: {
      fontSize: 9,
      fontFamily: 'KOMIKAH_',
      color: '#ddd'
    },
    favouritePlusBtn: {
      width: 120,
      marginTop: 10,
      height: 30,
      backgroundColor: '#ee7a33'
    },
    favStarIcon: {
      fontSize: 20,
      color: 'yellow'
    }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MyFavourite);
