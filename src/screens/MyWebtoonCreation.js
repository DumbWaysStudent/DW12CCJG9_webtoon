import React, { Component } from 'react';
import { View, StyleSheet, SafeAreaView, TouchableOpacity, FlatList} from 'react-native';
import  { Text, Button, Fab, Card, Thumbnail } from 'native-base'
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
              image: require('../images/goh.jpg'),
              episodes: '40 Episode(s)',
              prevScreen: 'MyWebtoonCreation'
            },
            {
              id: 2,
              title: 'Dice',
              seriesID: '01',
              image: require('../images/dice.jpg'),
              episodes: '40 Episode(s)',
              prevScreen: 'MyWebtoonCreation'
            },
            {
              id: 3,
              title: 'Bastard',
              seriesID: '01',
              image: require('../images/bastard.jpg'),
              episodes: '40 Episode(s)',
              prevScreen: 'MyWebtoonCreation'
            },
            {
              id: 4,
              title: 'UnTouchable',
              seriesID: '01',
              image: require('../images/untouchable.png'),
              episodes: '40 Episode(s)',
              prevScreen: 'MyWebtoonCreation'
            },
            {
              id: 5,
              title: 'Dr Frost',
              seriesID: '01',
              image: require('../images/dr-frost.jpg'),
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
            <Icon name="arrow-left" style={{color: '#fff'}} size={23} />
          </TouchableOpacity>

          <Text style={styles.headerTitle}>My Webtoon Creation</Text>

          </View>

          <View style={{ flex: 1, borderTopWidth: 1, borderTopColor: '#4D4645' }}>
          <FlatList
            showsHorizontalScrollIndicator={false}
            data={this.state.listMyWebtoon}
            renderItem={({ item }) =>
              <Card onTouchEnd={() => this.props.navigation.navigate('EditMyWebtoon', this.state.listMyWebtoon[item.id - 1])} style={styles.webtoonItem}>
                <Thumbnail source={item.image}  style={styles.webtoonImage} square />
                <View>
                  <Text style={styles.webtoonTitle}>{item.title}</Text>
                  <Text style={styles.episodes}>{item.episodes}</Text>
                </View>
              </Card>
            }
            keyExtractor={item => item.id}
            />
          <Fab
            style={{ backgroundColor: '#ee7a33' }}
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
    flex: 1,
    backgroundColor: '#383332'
  },
  header: {
    flexDirection: 'row',
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderBottomWidth: 1,
    borderColor: '#232222'
  },
  headerTitle: {
    fontSize: 16,
    fontFamily: 'KOMIKAHB',
    marginLeft: 14,
    color: '#fff'
  },
  webtoonItem: {
    flexDirection: 'row',
    marginTop: 10,
    marginVertical: 20,
    borderRadius: 5,
    borderColor: '#383332',
    backgroundColor: '#444',
    width: '95%',
    alignSelf: 'center',
    height: 80
  },
  webtoonImage: {
    width: 80,
    height: '100%',
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
    marginRight: 5
  },
  webtoonTitle: {
    fontFamily: 'KOMIKAH_',
    fontSize: 14,
    color: '#fff'
  },
  episodes: {
    fontSize: 9,
      fontFamily: 'KOMIKAH_',
      color: '#ddd'
  }
})

export default MyWebtoonCreation;
