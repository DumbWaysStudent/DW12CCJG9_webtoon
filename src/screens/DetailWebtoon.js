import React, { Component } from 'react';
import { View, Text, FlatList, StyleSheet, SafeAreaView, TouchableOpacity, Image, Share, AsyncStorage} from 'react-native';
import {Thumbnail, Item, Card} from 'native-base';
import Icon from "react-native-vector-icons/FontAwesome5";
import Axios from 'axios';

class DetailWebtoon extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listEpisode: [
        {
          title: '.....',
          preload: require('../assets/images/gif/Preload1.gif')
        },
        {
          title: '.....',
          preload: require('../assets/images/gif/Preload1.gif')
        },
        {
          title: '.....',
          preload: require('../assets/images/gif/Preload1.gif')
        }
      ],
      inputValue: this.props.navigation.getParam('title'),
      sigInData: null
    };
  }

  componentDidMount() {
    AsyncStorage.getItem('sigInData', (err, res) => {
      if (!err){
        if (res == null) {
          this.props.navigation.navigate('SignIn');
        } else {
          
          this.setState({
            sigInData: JSON.parse(res)
          })
          this.getAllData()
        }
      } else {
        console.log(err)
      }
    })
  }

  getAllData() {
    console.log('ID:' + this.props.navigation.getParam('id'));
    Axios({
      method: 'get',
        url: 'http://192.168.0.35:5320/api/v1/webtoon/' + this.props.navigation.getParam('id') + '/episodes',
        headers: {
          'Authorization': this.state.sigInData.token
        }
    })
    .then((response) => {
      this.setState({
        listEpisode: response.data
      })
      console.log(response.data)
    })
    .catch(err => console.log(err))
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

          <TouchableOpacity onPress={() => this.props.navigation.goBack()} style={styles.headerBackBtn}>
            <Icon name="arrow-left" style={{color: '#fff'}} size={23} />
          </TouchableOpacity>

          <Text style={styles.headerTitle}>{this.props.navigation.getParam('title')}</Text>

          <TouchableOpacity
            onPress={() => this.ShareMessage()}
            style={styles.headerShareBtn}>
            <Icon name="share-alt" style={{color: '#fff'}} size={23} />
          </TouchableOpacity>

        </View>
        
        <View style={styles.banner}>
          <Image source={{uri: `${this.props.navigation.getParam('image')}`}} style={styles.bannerImage} />
        </View>
        <View style={styles.listEpisode}>
          <FlatList
            style={{width: '100%'}}
            showsVerticalScrollIndicator={false}
            data={this.state.listEpisode.reverse()}
            renderItem={({ item }) => 
              <Card 
                onTouchEnd={() => this.props.navigation.navigate('DetailEpisode', {
                  webtoon_id: this.props.navigation.getParam('id'),
                  episode_id: item.id,
                  prevScreen: 'DetailWebtoon'
                })}
                style={styles.episodeItem}>
                {console.log(item)}
                <Thumbnail square source={(item.hasOwnProperty('image')) ? {uri: `${item.image}`} : item.preload} style={styles.episodeImage} />
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
