import React, { Component } from 'react';
import { View, StyleSheet, SafeAreaView, TouchableOpacity, FlatList, TextInput } from 'react-native';
import { Text, Thumbnail, Item, Button } from 'native-base'
import Icon from "react-native-vector-icons/FontAwesome5";

class CreateWebtoon extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listEpisode: {
        '01': [
          {
            id: 1,
            title: 'Ep.1',
            image: require('../images/14587286205684423455.jpg'),
            lastUpdate: '1 Januari 2019'
          },
          {
            id: 2,
            title: 'Ep.2',
            series: 'Noblesse Awakening',
            image: require('../images/14587286394124423462.jpg'),
            lastUpdate: '7 Januari 2019'
          },
          {
            id: 3,
            title: 'Ep.3',
            series: 'Noblesse Awakening',
            image: require('../images/14593149300964423470.jpg'),
            lastUpdate: '14 Januari 2019'
          }
        ]
      }
    };
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>

          <TouchableOpacity onPress={() => this.props.navigation.navigate('MyWebtoonCreation')} style={styles.headerBackBtn}>
            <Icon name="arrow-left" style={{color: '#fff'}} size={23} />
          </TouchableOpacity>

          <Text style={styles.headerTitle}>Create Webtoon</Text>

          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('MyWebtoonCreation', { name: this.state.profileName, profilePic: this.state.profilePicture })}
            style={styles.headerOkBtn}>
            <Icon name="check" style={{color: '#fff'}} size={23} />
          </TouchableOpacity>
        </View>
        <View style={styles.createWebtoonPallete}>
          <View style={styles.palleteItem}>
            <Text style={styles.palleteItemTitle}>Title</Text>
            <TextInput style={styles.palleteItemInput} />
          </View>

          <View style={styles.palleteItem}>
            <Text style={styles.palleteItemTitle}>Episode</Text>
            <FlatList
              showsHorizontalScrollIndicator={false}
              data={this.state.listEpisode['01'].reverse()}
              renderItem={({ item }) =>
                <Item onPress={() => this.props.navigation.navigate('EditMyWebtoonEpisode', { prevScreen: 'CreateWebtoon', name: item.title })} style={styles.episodeItem}>
                  <Thumbnail source={item.image} style={styles.episodeImage} square />
                  <View style={styles.episodeInfo}>
                    <Text style={styles.episodeTitle}>{item.title}</Text>
                    <Text style={styles.episodeLastUpade}>{item.lastUpdate}</Text>
                  </View>
                </Item>
              }
              keyExtractor={item => item.id}
            />
          </View>
          <Button style={styles.palleteBtn} onPress={() => this.props.navigation.navigate('CreateWebtoonEpisode', { prevScreen: 'CreateWebtoon' })}>
            <Text style={styles.palleteBtnText}>
              <Icon name="plus" /> Add Episode
                  </Text>
          </Button>
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
  headerBackBtn: {
    alignItems: 'center',
    padding: 6
  },
  headerTitle: {
    fontSize: 16,
    fontFamily: 'KOMIKAHB',
    color: '#fff',
    padding: 6
  },
  headerOkBtn: {
    flex: 1,
    flexDirection: 'row-reverse',
    padding: 6
  },
  palleteItem: {
    padding: 10,
    paddingHorizontal: 30,
    borderTopWidth: 1,
    borderTopColor: '#4D4645',
  },
  palleteItemTitle: {
    fontSize: 14,
    color: '#fff',
    fontFamily: 'KOMIKAHB',
    marginBottom: 8
  },
  palleteItemInput: {
    borderWidth: 1,
    borderColor: '#444',
    backgroundColor: '#4D4645',
    color: '#fff',
    borderRadius: 4,
    fontFamily: 'KOMIKAH_',
    paddingHorizontal: 10,
    fontSize: 12
  },
  episodeItem: {
    alignItems: 'flex-start',
    borderBottomWidth: 0,
    marginBottom: 15,
  },
  episodeImage: {
    borderWidth: 2,
    borderColor: '#444',
    width: 70,
    height: 70
  },
  episodeInfo: {
    padding: 5,
    marginLeft: 8
  },
  episodeTitle: {
    fontSize: 14,
    color: '#fff',
    fontWeight: 'bold'
  },
  episodeLastUpade: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#999'
  },
  palleteBtn: {
    width: '82%',
    alignSelf: 'center',
    paddingHorizontal: 77,
    backgroundColor: '#ee7a33',
    borderRadius: 6
  },
  palleteBtnText: {
    textTransform: 'capitalize',
    alignSelf: 'center',
    fontFamily: 'KOMIKAH_'
  }
})

export default CreateWebtoon;
