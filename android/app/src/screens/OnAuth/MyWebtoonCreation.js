import React, { Component } from 'react';
import { View, StyleSheet, SafeAreaView, TouchableOpacity, FlatList} from 'react-native';
import  { Text, Button, Fab, Item, Thumbnail } from 'native-base'
import Icon from "react-native-vector-icons/FontAwesome5";

class MyWebtoonCreation extends Component {
  constructor(props) {
    super(props);
    this.state = {
        listMyWebtoon: [
            {
              id: 1,
              title: 'God Of Highschool',
              seriesID: '01',
              image: require('../../main/assets/images/goh.jpg'),
              episodes: '40 Episode(s)',
              prevScreen: 'MyWebtoonCreation'
            },
            {
              id: 2,
              title: 'Dice',
              seriesID: '01',
              image: require('../../main/assets/images/dice.jpg'),
              episodes: '40 Episode(s)',
              prevScreen: 'MyWebtoonCreation'
            },
            {
              id: 3,
              title: 'Bastard',
              seriesID: '01',
              image: require('../../main/assets/images/bastard.jpg'),
              episodes: '40 Episode(s)',
              prevScreen: 'MyWebtoonCreation'
            },
            {
              id: 4,
              title: 'UnTouchable',
              seriesID: '01',
              image: require('../../main/assets/images/untouchable.png'),
              episodes: '40 Episode(s)',
              prevScreen: 'MyWebtoonCreation'
            },
            {
              id: 5,
              title: 'Dr Frost',
              seriesID: '01',
              image: require('../../main/assets/images/dr-frost.jpg'),
              episodes: '40 Episode(s)',
              prevScreen: 'MyWebtoonCreation'
            }
          ]
    };
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
          <View style={styles.header}>

          <TouchableOpacity onPress={() => this.props.navigation.navigate('Profile')} style={styles.headerBackBtn}>
            <Icon name="arrow-left" size={23} />
          </TouchableOpacity>

          <Text style={styles.headerTitle}>My Webtoon Creation</Text>

          </View>

          <View style={{ flex: 1 }}>
          <FlatList
            showsHorizontalScrollIndicator={false}
            data={this.state.listMyWebtoon}
            renderItem={({ item }) =>
              <Item onPress={() => this.props.navigation.navigate('EditMyWebtoon', this.state.listMyWebtoon[item.id - 1])} style={styles.webtoonItem}>
                <Thumbnail source={item.image}  style={styles.webtoonImage} square />
                <View>
                  <Text style={styles.webtoonTitle}>{item.title}</Text>
                  <Text style={styles.episodes}>{item.episodes}</Text>
                </View>
              </Item>
            }
            keyExtractor={item => item.id}
            />
          <Fab
            style={{ backgroundColor: '#5067FF' }}
            position="bottomRight"
            onPress={() => this.props.navigation.navigate('CreateWebtoon')}>
            <Icon name="plus" />
          </Fab>
          </View>
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  header: {
    flexDirection: 'row',
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderBottomWidth: 1,
    borderColor: '#ddd'
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 14
  },
  webtoonItem: {
    marginTop: 10,
    marginRight: 2,
    paddingBottom: 4,
    borderBottomWidth: 1
  },
  webtoonImage: {
    width: 60,
    height: 60,
    borderWidth: 2,
    borderColor: '#444',
    borderRadius: 5,
    marginRight: 5
  },
  webtoonTitle: {
    fontWeight: 'bold',
    fontSize: 14,
  },
  episodes: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#aaa'
  }
})

export default MyWebtoonCreation;
