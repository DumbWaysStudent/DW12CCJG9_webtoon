import React, { Component } from 'react';
import { View, Text, FlatList, StyleSheet, SafeAreaView, TouchableOpacity, Image, Share, AsyncStorage, Dimensions} from 'react-native';
import {Thumbnail, Item, Card, Toast} from 'native-base';
import Icon from "react-native-vector-icons/FontAwesome5";
import { connect } from 'react-redux'
import * as actionEpisode from './../redux/actions/actionEpisode'
import Axios from 'axios';
import {Image_URL} from './../services/rest-api'

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
      sigInData: null,
      preloadStatus: true,
      preloadImage: require('../assets/images/gif/Preload1.gif')
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

          this.props.handleGetEpisodes({
            webtoonID: this.props.navigation.getParam('id'),
            token: this.state.sigInData.token
          })
          .then(() => {})
          .catch((e) => {
            this.toastGenerator('error', "Error: Can't load episodes data")
          })
        }
      } else {
        this.toastGenerator('error', "Error: Can't load data from localStorage")
      }
    })
  }

  // getAllData() {
  //   console.log('ID:' + this.props.navigation.getParam('id'));
  //   Axios({
  //     method: 'get',
  //       url: 'http://192.168.0.35:5320/api/v1/webtoon/' + this.props.navigation.getParam('id') + '/episodes',
  //       headers: {
  //         'Authorization': this.state.sigInData.token
  //       }
  //   })
  //   .then((response) => {
  //     this.setState({
  //       listEpisode: response.data
  //     })
  //     console.log(response.data)
  //   })
  //   .catch(err => console.log(err))
  // }

  ShareMessage() {
    Share.share({
      message: this.state.inputValue.toString()
    }).then(result => console.log(result))
      .catch(errorMsg => console.log(errorMsg))
  }

  toastGenerator = (type = 'error', message) => {
    Toast.show({
      text: message,
      textStyle: { fontSize: 12, fontWeight: 'bold' },
      duration: 1000,
      style: (type == 'error') ? [styles.toastStyle, styles.errorToast] : [styles.toastStyle, styles.successToast]
    });
  }

  render() {
    console.log(this.props.navigation.state.params)
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
          <Image
            onLoadStart={(e) => this.setState({preloadStatus: false})}
            source={(this.state.preloadStatus) ? this.state.preloadImage : {uri: `${Image_URL}/${this.props.navigation.getParam('image')}`}} style={styles.bannerImage} />
        </View>
        <View style={styles.listEpisode}>
          <FlatList
            style={{width: '100%'}}
            showsVerticalScrollIndicator={false}
            data={this.props.localEpisodes.episodes}
            renderItem={({ item }) =>
            <TouchableOpacity onPress={() =>
              this.props.navigation.navigate('DetailEpisode', {
              webtoon_id: this.props.navigation.getParam('id'),
              episode_id: item.id,
              title: item.title
            })}>
              <Card style={styles.episodeItem}>
                <Thumbnail
                  square
                  onLoadStart={(e) => this.setState({preloadStatus: false})}
                  source={(this.state.preloadStatus) ? this.state.preloadImage : {uri: `${Image_URL}/${item.image}`}} style={styles.episodeImage} />
                <View style={styles.episodeInfo}>
                  <Text style={styles.episodeTitle}>{item.title}</Text>
                  <Text style={styles.episodeLastUpade}>{item.lastUpdate}</Text>
                </View>
              </Card>
            </TouchableOpacity>
            }
            keyExtractor={item => item.id}
          />
        </View>
      </SafeAreaView>
    )
  }
}

const mapStateToProps = state => {
  return {
    localEpisodes: state.episodes,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    // ----------- Episodes ------------//
    handleGetEpisodes: (params) => dispatch(actionEpisode.handleGetEpisodes(params))
  }
}

const { width, height } = Dimensions.get('screen');

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
    },
    toastStyle: {
      marginHorizontal: 5,
      marginBottom: 10,
      borderRadius: 5
    },
    errorToast: {
      backgroundColor: '#ff3333'
    },
    successToast: {
      backgroundColor: '#2ab325'
    },
    signIntoastError: {
      backgroundColor: '#ff3333',
      marginHorizontal: 5,
      marginBottom: 5,
      borderRadius: 5
    },
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DetailWebtoon);
