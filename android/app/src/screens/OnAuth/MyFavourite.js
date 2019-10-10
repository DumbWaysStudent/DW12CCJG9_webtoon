import React, { Component } from 'react';
import { View, FlatList, StyleSheet, SafeAreaView} from 'react-native';
import {Button, Text, Input, Form, Label, Item, Container, Content, Thumbnail} from 'native-base'
import Icon from "react-native-vector-icons/FontAwesome5";

class MyFavourite extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      data: [
        {
          id: 1,
          title: 'God Of Highschool',
          seriesID: '01',
          image: require('../../main/assets/images/goh.jpg'),
          rating: '100+ Favourite'
        },
        {
          id: 2,
          title: 'Dice',
          seriesID: '01',
          image: require('../../main/assets/images/dice.jpg'),
          rating: '100+ Favourite'
        },
        {
          id: 3,
          title: 'Bastard',
          seriesID: '01',
          image: require('../../main/assets/images/bastard.jpg'),
          rating: '100+ Favourite'
        },
        {
          id: 4,
          title: 'UnTouchable',
          seriesID: '01',
          image: require('../../main/assets/images/untouchable.png'),
          rating: '100+ Favourite'
        },
        {
          id: 5,
          title: 'Dr Frost',
          seriesID: '01',
          image: require('../../main/assets/images/dr-frost.jpg'),
          rating: '100+ Favourite'
        }
      ],
      error: null,
      favouriteList: [
        {
          id: 1,
          title: 'God Of Highschool',
          seriesID: '01',
          image: require('../../main/assets/images/goh.jpg'),
          rating: '100+ Favourite',
          prevScreen: 'MyFavourite'
        },
        {
          id: 2,
          title: 'Dice',
          seriesID: '01',
          image: require('../../main/assets/images/dice.jpg'),
          rating: '100+ Favourite',
          prevScreen: 'MyFavourite'
        },
        {
          id: 3,
          title: 'Bastard',
          seriesID: '01',
          image: require('../../main/assets/images/bastard.jpg'),
          rating: '100+ Favourite',
          prevScreen: 'MyFavourite'
        },
        {
          id: 4,
          title: 'UnTouchable',
          seriesID: '01',
          image: require('../../main/assets/images/untouchable.png'),
          rating: '100+ Favourite',
          prevScreen: 'MyFavourite'
        },
        {
          id: 5,
          title: 'Dr Frost',
          seriesID: '01',
          image: require('../../main/assets/images/dr-frost.jpg'),
          rating: '100+ Favourite',
          prevScreen: 'MyFavourite'
        }
      ]
    };
  }

  searchFilter(text) {
    const newData = this.state.favouriteList.filter(item => {      
      const itemData = `${item.title.toUpperCase()}`
      
       const textData = text.toUpperCase();
        console.log(itemData.indexOf(textData))
       return itemData.indexOf(textData) > -1;    
    });
    
    this.setState({ data: newData }); 
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
          <Item style={styles.searchBox}>
              <Input
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
            data={this.state.data}
            renderItem={({ item }) =>
              <Item style={styles.favoriteBannerItem}>
                <Thumbnail source={item.image}  style={styles.favoriteBannerItemImage} square />
                <View>
                  <Text onPress={() => this.props.navigation.navigate('DetailWebtoon', this.state.favouriteList[item.id - 1])} style={styles.favoriteBannerTitle}>{item.title}</Text>
                  <Text style={styles.favouriteRating}>{item.rating}</Text>
                </View>
              </Item>
            }
            keyExtractor={item => item.id}
            />
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    searchBox: {
        borderTopWidth: 2,
        borderLeftWidth: 2,
        borderRightWidth: 2,
        borderBottomWidth: 2,
        borderColor: '#444',
        borderRadius: 5,
        marginLeft: 10,
        marginTop: 8,
        marginBottom: 8,
        width: '94%',
        // flex: 1
    },
    searchBoxInput: {
        borderBottomWidth: 0
    },
    searchBoxIcon: {
      paddingVertical: 15,
      paddingHorizontal:12,
      borderLeftWidth: 2,
      borderLeftColor: '#444'
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
      marginTop: 10,
      marginRight: 2,
      paddingBottom: 4,
      borderBottomWidth: 1
    },
    favoriteBannerItemImage: {
      width: 80,
      height: 80,
      borderWidth: 2,
      borderColor: '#444',
      borderRadius: 5,
      marginRight: 5
    },
    favoriteBannerTitle: {
      fontWeight: 'bold'
    },
    favouriteRating: {
      fontSize: 12,
      fontWeight: 'bold',
      color: '#aaa'
    }
})

export default MyFavourite;
