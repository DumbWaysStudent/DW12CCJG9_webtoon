import React, { Component } from 'react';
import { View, FlatList, StyleSheet, SafeAreaView} from 'react-native';
import { Text, Input, Item, Card, Thumbnail} from 'native-base'
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
            data={this.state.data}
            renderItem={({ item }) =>
              <Card onTouchEnd={() => this.props.navigation.navigate('DetailWebtoon', this.state.favouriteList[item.id - 1])} style={styles.favoriteBannerItem}>
                <Thumbnail source={item.image}  style={styles.favoriteBannerItemImage} square />
                <View>
                  <Text style={styles.favoriteBannerTitle}>{item.title}</Text>
                  <Text style={styles.favouriteRating}>{item.rating}</Text>
                </View>
              </Card>
            }
            keyExtractor={item => item.id}
            />
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
      fontFamily: 'KOMIKAH_'
    },
    favouriteRating: {
      fontSize: 9,
      fontFamily: 'KOMIKAH_',
      color: '#ddd'
    }
})

export default MyFavourite;
