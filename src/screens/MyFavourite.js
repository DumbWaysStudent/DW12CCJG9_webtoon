import React, { Component } from 'react';
import { View, FlatList, StyleSheet, SafeAreaView} from 'react-native';
import {Button, Text, Input, Form, Label, Item, Card, Content, Thumbnail} from 'native-base'
import Icon from "react-native-vector-icons/FontAwesome5";
import { TouchableOpacity } from 'react-native-gesture-handler';

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
          image: require('../assets/images/goh.jpg'),
          rating: '100+ Favourite'
        },
        {
          id: 2,
          title: 'Dice',
          seriesID: '01',
          image: require('../assets/images/dice.jpg'),
          rating: '100+ Favourite'
        },
        {
          id: 3,
          title: 'Bastard',
          seriesID: '01',
          image: require('../assets/images/bastard.jpg'),
          rating: '100+ Favourite'
        },
        {
          id: 4,
          title: 'UnTouchable',
          seriesID: '01',
          image: require('../assets/images/untouchable.png'),
          rating: '100+ Favourite'
        },
        {
          id: 5,
          title: 'Dr Frost',
          seriesID: '01',
          image: require('../assets/images/dr-frost.jpg'),
          rating: '100+ Favourite'
        }
      ],
      error: null,
      favouriteList: [
        {
          id: 1,
          title: 'God Of Highschool',
          seriesID: '01',
          image: require('../assets/images/goh.jpg'),
          rating: '100+ Favourite',
          prevScreen: 'MyFavourite'
        },
        {
          id: 2,
          title: 'Dice',
          seriesID: '01',
          image: require('../assets/images/dice.jpg'),
          rating: '100+ Favourite',
          prevScreen: 'MyFavourite'
        },
        {
          id: 3,
          title: 'Bastard',
          seriesID: '01',
          image: require('../assets/images/bastard.jpg'),
          rating: '100+ Favourite',
          prevScreen: 'MyFavourite'
        },
        {
          id: 4,
          title: 'UnTouchable',
          seriesID: '01',
          image: require('../assets/images/untouchable.png'),
          rating: '100+ Favourite',
          prevScreen: 'MyFavourite'
        },
        {
          id: 5,
          title: 'Dr Frost',
          seriesID: '01',
          image: require('../assets/images/dr-frost.jpg'),
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
          
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#383332'
  }
})

export default MyFavourite;
