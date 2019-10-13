import React, { Component } from 'react';
import { ScrollView, StyleSheet, SafeAreaView, FlatList, TouchableOpacity, View} from 'react-native';
import {Text, Input, Item, Thumbnail, Button, Card} from 'native-base'
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
          url: require('../assets/images/noblesse-awakening.jpg')
        },
        {
          url: require('../assets/images/tower-of-god.jpg')
        },
        {
          url: require('../assets/images/unordinary.png')
        }
      ],
      favouriteData: [
        {
          id: 1,
          seriesID: '01',
          seriesID: '01',
          title: 'God Of Highschool',
          seriesID: '01',
          image: require('../assets/images/goh.jpg'),
          prevScreen: 'ForYou'
        },
        {
          id: 2,
          title: 'Dice',
          seriesID: '01',
          image: require('../assets/images/dice.jpg'),
          prevScreen: 'ForYou'
        },
        {
          id: 3,
          title: 'Bastard',
          seriesID: '01',
          image: require('../assets/images/bastard.jpg'),
          prevScreen: 'ForYou'
        },
        {
          id: 4,
          title: 'UnTouchable',
          seriesID: '01',
          image: require('../assets/images/untouchable.png'),
          prevScreen: 'ForYou'
        },
        {
          id: 5,
          title: 'Dr Frost',
          seriesID: '01',
          image: require('../assets/images/dr-frost.jpg'),
          prevScreen: 'ForYou'
        }
      ],
      listAllToonData: [
        {
          id: 1,
          title: 'UnTouchable',
          seriesID: '01',
          image: require('../assets/images/untouchable.png'),
          prevScreen: 'ForYou'
        },
        {
          id: 2,
          title: 'Dr Frost',
          seriesID: '01',
          image: require('../assets/images/dr-frost.jpg'),
          prevScreen: 'ForYou'
        },
        {
          id: 3,
          title: 'Nobleese Awakening',
          seriesID: '01',
          image: require('../assets/images/noblesse-awakening.jpg'),
          prevScreen: 'ForYou'
        },
        {
          id: 4,
          title: 'Girls Of The Wild',
          seriesID: '01',
          image: require('../assets/images/girls-of-the-wild.png'),
          prevScreen: 'ForYou'
        },
        {
          id: 5,
          title: "Melvina's Theraphy",
          seriesID: '01',
          image: require('../assets/images/melvinas-therapy.jpg'),
          prevScreen: 'ForYou'
        },
        {
          id: 6,
          title: "Siren's Lament",
          seriesID: '01',
          image: require('../assets/images/sirens-lament.jpg'),
          prevScreen: 'ForYou'
        },
        {
          id: 7,
          title: "Winter Woods",
          seriesID: '01',
          image: require('../assets/images/winter-woods.jpg'),
          prevScreen: 'ForYou'
        },
        
      ],
      // enableScrollViewScroll: true
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

  // onEnableScroll(value) {
  //   this.setState({enableScrollViewScroll: value})
  // }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView>
          <Item style={styles.searchBox}>
              <Input placeholder="Search Your Webtoon..." placeholderTextColor="#888" style={styles.searchBoxInput}/>
              <Icon
                name="search"
                size={20}
                style={styles.searchBoxIcon}
              />
          </Item>
          <View style={styles.bannerContainer}>
          <Slideshow
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
            data={this.state.favouriteData}
            renderItem={({ item }) =>
              <Card style={styles.favoriteBannerItem}>
                <TouchableOpacity>
                  <Thumbnail source={item.image}  style={styles.favoriteBannerItemImage} square />
                </TouchableOpacity>
                <Text style={styles.favoriteBannerItemTitle}>{item.title}</Text>
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
                <Thumbnail source={item.image} style={styles.listAllToonItemImage} square />
                <Item style={styles.listAllToonItemTB}>
                  <Text style={styles.listAllToonItemTitle}>{item.title}</Text>
                  <Button style={styles.favouritePlusBtn}><Text style={{fontSize: 12, textTransform: 'capitalize'}}><Icon name="plus" size={10} /> Favourite</Text></Button>
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
    listAllToonItemTitle: {
      fontSize: 12,
      color: '#fff',
      marginBottom: 10,
      fontFamily: 'KOMIKAH_'
    }
})

export default ForYou;
