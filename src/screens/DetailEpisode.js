import React, { Component } from 'react';
import { View, Text, FlatList, StyleSheet, SafeAreaView, TouchableOpacity, Image, Share, AsyncStorage} from 'react-native';
import Icon from "react-native-vector-icons/FontAwesome5";
import { connect } from 'react-redux'
import * as actionImage from './../redux/actions/actionImage'
import {Image_URL} from './../services/rest-api'

class DetailEpisode extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pageList: [
        {
          id: 1,
          image: require('../assets/images/Noblesse/14587286121364423458.jpg'),
        },
        {
          id: 2,
          image: require('../assets/images/Noblesse/14587286122444423453.jpg'),
        },
        {
          id: 3,
          image: require('../assets/images/Noblesse/14587286122984423451.jpg'),

        }
      ],
      inputValue: 'Shared React Native',
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

          this.props.handleGetImages({
            webtoonID: this.props.navigation.getParam('webtoon_id'),
            episodeID: this.props.navigation.getParam('episode_id'),
            token: this.state.sigInData.token
          })
        }
      } else {
        console.log(err)
      }
    })
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
        <FlatList
            style={{width: '100%'}}
            showsVerticalScrollIndicator={false}
            data={this.props.localImages.images}
            renderItem={({ item }) => 
              <View style={styles.page}>
                <Image
                  onLoadStart={(e) => this.setState({preloadStatus: false})}
                  source={(this.state.preloadStatus) ? this.state.preloadImage : {uri: `${Image_URL}/${item.image}`}} style={styles.pageImage} />
              </View>
            }
            keyExtractor={item => item.id}
          />
      </SafeAreaView>
    )
  }
}

const mapStateToProps = state => {
  return {
    localImages: state.images,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    // ----------- Episodes ------------//
    handleGetImages: (params) => dispatch(actionImage.handleGetImages(params))
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
      color: '#fff',
      fontSize: 18,
      paddingVertical: 5
    },
    headerShareBtn: {
      flex: 1,
      alignItems: 'center',
      padding: 6
    },
    pageImage: {
        width: '100%',
        height: 500
    }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DetailEpisode);
