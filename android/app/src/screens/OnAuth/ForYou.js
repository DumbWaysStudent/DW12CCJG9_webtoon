import React, { Component } from 'react';
import { View, StyleSheet, SafeAreaView, FlatList} from 'react-native';
import {Text, Input, Item, Thumbnail, Button} from 'native-base'
import Icon from "react-native-vector-icons/FontAwesome5";
import Slideshow from 'react-native-image-slider-show';


class ForYou extends Component {
  constructor(props) {
    super(props);
    this.state = {
      position: 1,
      interval: null,
      dataSource: [
        {
          url: require('../main/assets/images/noblesse-awakening.jpg')
        },
        {
          url: require('../main/assets/images/tower-of-god.jpg')
        },
        {
          url: require('../main/assets/images/unordinary.png')
        }
      ],
      favouriteData: [
        {
          id: 1,
          title: 'God Of Highschool',
          image: require('../main/assets/images/goh.jpg')
        },
        {
          id: 2,
          title: 'Dice',
          image: require('../main/assets/images/dice.jpg')
        },
        {
          id: 3,
          title: 'Bastard',
          image: require('../main/assets/images/bastard.jpg')
        },
        {
          id: 4,
          title: 'UnTouchable',
          image: require('../main/assets/images/untouchable.png')
        },
        {
          id: 5,
          title: 'Dr Frost',
          image: require('../main/assets/images/dr-frost.jpg')
        }
      ],
      listAllToonData: [
        {
          id: 1,
          title: 'UnTouchable',
          image: require('../main/assets/images/untouchable.png')
        },
        {
          id: 2,
          title: 'Dr Frost',
          image: require('../main/assets/images/dr-frost.jpg')
        },
        {
          id: 4,
          title: 'Nobleese Awakening',
          image: require('../main/assets/images/noblesse-awakening.jpg')
        },
        {
          id: 5,
          title: 'Girls Of The Wild',
          image: require('../main/assets/images/girls-of-the-wild.png')
        },
        {
          id: 6,
          title: "Melvina's Theraphy",
          image: require('../main/assets/images/melvinas-therapy.jpg')
        },
        {
          id: 7,
          title: "Siren's Lament",
          image: require('../main/assets/images/sirens-lament.jpg')
        },
        {
          id: 8,
          title: "Winter Woods",
          image: require('../main/assets/images/winter-woods.jpg')
        },
        
      ]
    };
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

  render() {
    return (
      <SafeAreaView style={styles.container}>
          <Item style={styles.searchBox}>
              <Input style={styles.searchBoxInput}/>
              <Icon
                name="search"
                size={20}
                style={styles.searchBoxIcon}
              />
          </Item>
          <Item style={styles.bannerContainer}>
          <Slideshow
              arrowSize={0}
              containerStyle={{borderRadius: 10}}
              height={176}
              dataSource={this.state.dataSource}
              position={this.state.position}
              onPositionChanged={position => this.setState({ position })} />
          </Item>
          <Item style={styles.favoriteBannerList}>
            <Text style={styles.favoriteBannerTitle}>Favourite</Text>
            <FlatList
            showsHorizontalScrollIndicator={false}
            data={this.state.favouriteData}
            renderItem={({ item }) =>
              <Item style={styles.favoriteBannerItem}>
                <Thumbnail source={item.image}  style={styles.favoriteBannerItemImage} square />
                <Text style={styles.favoriteBannerItemTitle}>{item.title}</Text>
              </Item>
            }
            keyExtractor={item => item.id}
            horizontal={true}
            />
          </Item>
          <Item style={styles.listAllToon}>
            <Text style={styles.listAllToonTitle}>All</Text>
            <FlatList
            style={{width: '100%'}}
            showsVerticalScrollIndicator={false}
            data={this.state.listAllToonData}
            renderItem={({ item }) =>
              <Item style={styles.listAllToonItem}>
                <Thumbnail source={item.image} style={styles.listAllToonItemImage} square />
                <Item style={styles.listAllToonItemTB}>
                  <Text style={styles.listAllToonItemTitle}>{item.title}</Text>
                  <Button style={styles.favouritePlusBtn}><Text style={{fontSize: 12, textTransform: 'capitalize'}}><Icon name="plus" size={10} /> Favourite</Text></Button>
                </Item>
              </Item>
            }
            keyExtractor={item => item.id}
            />
          </Item>
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
    },
    bannerImage: {
      borderWidth: 2,
      borderColor: '#444',
      width: '100%',
      height: '100%'
    },
    favoriteBannerList: {
      flexDirection: 'column',
      alignItems: 'flex-start',
      borderBottomWidth: 0,
      marginTop: 18,
      marginLeft: 10
    },
    favoriteBannerTitle: {
      fontSize: 18,
      fontWeight: 'bold',
    },
    favoriteBannerItem: {
      position: 'relative',
      flexDirection: 'column',
      marginTop: 10,
      borderBottomWidth: 0,
    },
    favoriteBannerItemImage: {
      width: 120,
      height: 120,
      borderWidth: 2,
      borderColor: '#444',
      marginRight: 10,
      borderRadius: 5
    },
    favoriteBannerItemTitle: {
      fontSize: 11,
      fontWeight: 'bold'
    },
    listAllToon: {
      alignItems: 'flex-start',
      flexDirection: 'column',
      borderBottomWidth: 0,
      marginTop: 6,
      marginLeft: 10,
      height: 140
    },
    listAllToonTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 10,
    },
    listAllToonItem: {
      marginTop: 10,
      paddingBottom: 4,
      borderBottomWidth: 1
    },
    listAllToonItemImage: {
      width: 80,
      height: 80,
      borderWidth: 2,
      borderColor: '#444',
      borderRadius: 5,
      marginRight: 5
    },
    listAllToonItemTB: {
      flexDirection: 'column',
      alignItems: 'flex-start',
      borderBottomWidth: 0
    },
    favouritePlusBtn: {
      marginTop: 5,
      height: 30,
      backgroundColor: '#fc9003'
    },
    listAllToonItemTitle: {
      fontWeight: 'bold'
    }
})

export default ForYou;
