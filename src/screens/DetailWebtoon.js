import React, { Component } from 'react';
import { View, Text, FlatList, StyleSheet, SafeAreaView, TouchableOpacity, Image, Share} from 'react-native';
import {Thumbnail, Card} from 'native-base';
import Icon from "react-native-vector-icons/FontAwesome5";

class DetailWebtoon extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listEpisode: {
        '01': [
          {
            id: 1,
            title: 'Ep.1',
            image: require('../assets/images/14587286205684423455.jpg'),
            lastUpdate: '1 Januari 2019'
          },
          {
            id: 2,
            title: 'Ep.2',
            series: 'Noblesse Awakening',
            image: require('../assets/images/14587286394124423462.jpg'),
            lastUpdate: '7 Januari 2019'
          },
          {
            id: 3,
            title: 'Ep.3',
            series: 'Noblesse Awakening',
            image: require('../assets/images/14593149300964423470.jpg'),
            lastUpdate: '14 Januari 2019'
          }
        ]
      },
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

          <TouchableOpacity onPress={() => this.props.navigation.navigate((this.props.navigation.state.params) ? this.props.navigation.getParam('prevScreen') : 'Home')} style={styles.headerBackBtn}>
            <Icon name="arrow-left" style={{color: '#fff'}} size={23} />
          </TouchableOpacity>

          <Text style={styles.headerTitle}>{(this.props.navigation.state.params) ? this.props.navigation.getParam('title') : 'Noblesse'}</Text>

          <TouchableOpacity
            onPress={() => this.ShareMessage()}
            style={styles.headerShareBtn}>
            <Icon name="share-alt" style={{color: '#fff'}} size={23} />
          </TouchableOpacity>

        </View>
        
        <View style={styles.banner}>
          <Image source={(this.props.navigation.state.params) ? this.props.navigation.getParam('image') : require('../assets/images/noblesse-awakening.jpg')} style={styles.bannerImage} />
        </View>
        <View style={styles.listEpisode}>
          <FlatList
            style={{width: '100%'}}
            showsVerticalScrollIndicator={false}
            data={this.state.listEpisode[(this.props.navigation.state.params) ? this.props.navigation.getParam('seriesID') : '01'].reverse()}
            renderItem={({ item }) => 
              <Card style={styles.episodeItem}>
                <Thumbnail square source={item.image} style={styles.episodeImage} />
                <View style={styles.episodeInfo}>
                  <Text style={styles.episodeTitle}>{item.title}</Text>
                  <Text style={styles.episodeLastUpade}>{item.lastUpdate}</Text>
                </View>
              </Card>
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
        flex: 1,
        backgroundColor: '#383332'
    },
    header: {
      flexDirection: 'row',
      paddingVertical: 12,
      borderBottomWidth: 1,
      borderColor: '#232222'
    },
    headerBackBtn: {
      flex: 1,
      alignItems: 'center',
      padding: 6
    },
    headerTitle: {
      flex: 9,
      textAlign: 'center',
      fontFamily: 'KOMIKAHB',
      fontSize: 18,
      paddingVertical: 5,
      textTransform: 'capitalize',
      color: '#fff'
    },
    headerShareBtn: {
      flex: 1,
      alignItems: 'center',
      padding: 6
    },
    banner: {
      width: '100%',
      height: 200,
      borderTopWidth: 1,
      borderTopColor: '#4D4645',
      borderBottomWidth: 2,
      borderBottomColor: '#444',
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
      marginBottom: 10,
      borderColor: '#444',
      borderRadius: 5,
      width: '95%',
      alignSelf: 'center',
      backgroundColor: '#444',
      height: 70
    },
    episodeImage: {
      width: 70,
      height: '100%',
      borderTopLeftRadius: 5,
      borderBottomLeftRadius: 5,
    },
    episodeInfo: {
      padding: 5
    },
    episodeTitle: {
      fontSize: 14,
      fontFamily: 'KOMIKAH_',
      color: '#fff'
    },
    episodeLastUpade: {
      fontSize: 9,
      fontFamily: 'KOMIKAH_',
      color: '#999'
    }
})

export default DetailWebtoon;
