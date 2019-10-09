import React, { Component } from 'react';
import { View, Text, FlatList, StyleSheet, SafeAreaView, TouchableOpacity, Image, Share} from 'react-native';
import {Thumbnail} from 'native-base'
import Icon from "react-native-vector-icons/FontAwesome5";

class DetailWebtoon extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listEpisode: [
        {
          id: 1,
          title: 'Ep.1',
          image: require('../../main/assets/images/noblesse-awakening.jpg'),
          lastUpdate: '1 Januari 2019'
        },
        {
          id: 2,
          title: 'Ep.2',
          image: require('../../main/assets/images/noblesse-awakening.jpg'),
          lastUpdate: '7 Januari 2019'
        },
        {
          id: 3,
          title: 'Ep.3',
          image: require('../../main/assets/images/noblesse-awakening.jpg'),
          lastUpdate: '14 Januari 2019'
        }
      ],
      inputValue: 'Shared React Native'
    };
  }

  ShareMessage() {
    Share.share({
      message: this.state.inputValue.toString()
    }).then(result => console.log(result))
      .catch(errorMsg => console.log(errorMsg))
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>

          <TouchableOpacity style={styles.headerBackBtn}>
            <Icon name="arrow-left" size={23} />
          </TouchableOpacity>

          <Text style={styles.headerTitle}>Noblesse Awakening</Text>

          <TouchableOpacity
            onPress={() => this.ShareMessage()}
            style={styles.headerShareBtn}>
            <Icon name="share-alt" size={23} />
          </TouchableOpacity>

        </View>
        <View style={styles.banner}>
          <Image source={require('../../main/assets/images/noblesse-awakening.jpg')} style={styles.bannerImage} />
        </View>
        <View style={styles.listEpisode}>
          <FlatList
            style={{width: '100%'}}
            showsVerticalScrollIndicator={false}
            data={this.state.listEpisode.reverse()}
            renderItem={({ item }) => 
              <View style={styles.episodeItem}>
                <Thumbnail square source={item.image} style={styles.episodeImage} />
                <View style={styles.episodeInfo}>
                  <Text style={styles.episodeTitle}>{item.title}</Text>
                  <Text style={styles.episodeLastUpade}>{item.lastUpdate}</Text>
                </View>
              </View>
            }
            keyExtractor={item => item.id}
          />
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
      borderColor: '#444'
    },
    headerBackBtn: {
      flex: 1,
      alignItems: 'center',
      padding: 6
    },
    headerTitle: {
      flex: 9,
      textAlign: 'center',
      fontWeight: 'bold',
      fontSize: 18,
      paddingVertical: 5
    },
    headerShareBtn: {
      flex: 1,
      alignItems: 'center',
      padding: 6
    },
    banner: {
      width: '100%',
      height: 200,
      borderBottomWidth: 2,
      borderColor: '#444',
      margin: 0
    },
    bannerImage: {
      width: '100%',
      height: '100%',
    },
    listEpisode: {
      marginTop: 30
    },
    episodeItem: {
      flexDirection: 'row',
      padding: 5,
      marginBottom: 10,
      borderBottomWidth: 1,
      borderColor: '#eee',
    },
    episodeImage: {
      borderRadius: 3
    },
    episodeInfo: {
      padding: 5
    },
    episodeTitle: {
      fontSize: 14,
      fontWeight: 'bold'
    },
    episodeLastUpade: {
      fontSize: 12,
      fontWeight: 'bold',
      color: '#999'
    }
})

export default DetailWebtoon;