import React, { Component } from 'react';
import { ScrollView, StyleSheet, SafeAreaView, FlatList, TouchableOpacity} from 'react-native';
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
          url: require('../../main/assets/images/noblesse-awakening.jpg')
        },
        {
          url: require('../../main/assets/images/tower-of-god.jpg')
        },
        {
          url: require('../../main/assets/images/unordinary.png')
        }
      ],
      favouriteData: [
        {
          id: 1,
          seriesID: '01',
          seriesID: '01',
          title: 'God Of Highschool',
          seriesID: '01',
          image: require('../../main/assets/images/goh.jpg'),
          prevScreen: 'ForYou'
        },
        {
          id: 2,
          title: 'Dice',
          seriesID: '01',
          image: require('../../main/assets/images/dice.jpg'),
          prevScreen: 'ForYou'
        },
        {
          id: 3,
          title: 'Bastard',
          seriesID: '01',
          image: require('../../main/assets/images/bastard.jpg'),
          prevScreen: 'ForYou'
        },
        {
          id: 4,
          title: 'UnTouchable',
          seriesID: '01',
          image: require('../../main/assets/images/untouchable.png'),
          prevScreen: 'ForYou'
        },
        {
          id: 5,
          title: 'Dr Frost',
          seriesID: '01',
          image: require('../../main/assets/images/dr-frost.jpg'),
          prevScreen: 'ForYou'
        }
      ],
      listAllToonData: [
        {
          id: 1,
          title: 'UnTouchable',
          seriesID: '01',
          image: require('../../main/assets/images/untouchable.png'),
          prevScreen: 'ForYou'
        },
        {
          id: 2,
          title: 'Dr Frost',
          seriesID: '01',
          image: require('../../main/assets/images/dr-frost.jpg'),
          prevScreen: 'ForYou'
        },
        {
          id: 3,
          title: 'Nobleese Awakening',
          seriesID: '01',
          image: require('../../main/assets/images/noblesse-awakening.jpg'),
          prevScreen: 'ForYou'
        },
        {
          id: 4,
          title: 'Girls Of The Wild',
          seriesID: '01',
          image: require('../../main/assets/images/girls-of-the-wild.png'),
          prevScreen: 'ForYou'
        },
        {
          id: 5,
          title: "Melvina's Theraphy",
          seriesID: '01',
          image: require('../../main/assets/images/melvinas-therapy.jpg'),
          prevScreen: 'ForYou'
        },
        {
          id: 6,
          title: "Siren's Lament",
          seriesID: '01',
          image: require('../../main/assets/images/sirens-lament.jpg'),
          prevScreen: 'ForYou'
        },
        {
          id: 7,
          title: "Winter Woods",
          seriesID: '01',
          image: require('../../main/assets/images/winter-woods.jpg'),
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
                <TouchableOpacity onPress={() => this.props.navigation.navigate('DetailWebtoon', this.state.favouriteData[item.id - 1]) }>
                  <Thumbnail source={item.image}  style={styles.favoriteBannerItemImage} square />
                </TouchableOpacity>
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
              <Item onPress={() => this.props.navigation.navigate('DetailWebtoon', this.state.listAllToonData[item.id - 1]) } style={styles.listAllToonItem}>
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
          </ScrollView>
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
        borderBottomWidth: 0,
        fontWeight: 'bold',
        paddingHorizontal: 8,
        fontSize: 16,
        fontWeight: 'bold'
        // fontFamily: 'KOMIKASL'
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
      marginLeft: 10,
      marginBottom: 10
    },
    favoriteBannerTitle: {
      fontSize: 18,
      fontWeight: 'bold'
      // fontFamily: 'KOMIKAHB'
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
      // fontFamily: 'KOMIKAH_'
    },
    listAllToon: {
      alignItems: 'flex-start',
      flexDirection: 'column',
      borderBottomWidth: 0,
      marginTop: 6
    },
    listAllToonTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      // fontFamily: 'KOMIKAHB',
      marginBottom: 10,
    },
    listAllToonItem: {
      marginTop: 10,
      paddingBottom: 4,
      borderBottomWidth: 1,
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
      fontSize: 12,
      fontWeight: 'bold'
      // fontFamily: 'KOMIKAHB'
    }
})

export default ForYou;
