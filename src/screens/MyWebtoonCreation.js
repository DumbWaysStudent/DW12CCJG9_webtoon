import React, { Component } from 'react';
import { View, StyleSheet, SafeAreaView, TouchableOpacity, FlatList, AsyncStorage, Modal, Dimensions, RefreshControl, Image } from 'react-native';
import { Text, Button, Fab, Card, Thumbnail, Toast } from 'native-base'
import Icon from "react-native-vector-icons/FontAwesome5";
import { connect } from 'react-redux'
import * as actionWebtoon from './../redux/actions/actionWebtoon'
import SpinIcon from './../components/SpinIcon'
import {Image_URL} from './../services/rest-api'

class MyWebtoonCreation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      signInData: null,
      dataVisible: 'none',
      listMyWebtoon: [
        {
          id: 1,
          title: '.....',
          preload: require('../assets/images/gif/Preload1.gif'),
          episodes: '40 Episode(s)'
        },
        {
          id: 2,
          title: '.....',
          preload: require('../assets/images/gif/Preload1.gif'),
          episodes: '40 Episode(s)'
        },
        {
          id: 3,
          title: '.....',
          preload: require('../assets/images/gif/Preload1.gif'),
          episodes: '40 Episode(s)'
        },
        {
          id: 4,
          title: '.....',
          preload: require('../assets/images/gif/Preload1.gif'),
          episodes: '40 Episode(s)'
        },
        {
          id: 5,
          title: '.....',
          preload: require('../assets/images/gif/Preload1.gif'),
          episodes: '40 Episode(s)'
        }
      ],
      preloadStatus: true,
      preloadImage: require('../assets/images/gif/Preload1.gif')
    };
  }

  componentDidMount() {
    AsyncStorage.getItem('sigInData', (err, res) => {
      if (!err) {
        if (res == null) {
          this.props.navigation.navigate('SignIn');
        } else {
          // store sig in data to local state
          this.setState({
            signInData: JSON.parse(res)
          })

          // load data from redux store
          // console.log(this.state.signInData)

          this.loadData();

          // console.log(this.props.localWebtoons)
          // this.props.handleGetProfileImage(this.state.sigInData.id)
          // this.props.handleGetProfileName(this.state.sigInData.id)

        }
      } else {
        this.toastGenerator('error', "Error: Can't load data from localStorage")
      }
    })
  }

  loadData = () => {
    this.setState({ dataVisible: 'none' })
    this.props.handleGetMyWebtoons({
      userID: this.state.signInData.id,
      token: this.state.signInData.token
    })
    .then(() => {
      this.setState({ dataVisible: 'flex' })
    })
    .catch((e) => {
      this.toastGenerator('error', "Error: Can't load my webtoon data")
    })
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
    // console.log(this.props.localWebtoons.myWebtoonsEpisodes[0])
    return (
      <SafeAreaView style={styles.container}>
        {/* <Modal animationType="none"
          transparent={true}
          visible={(this.props.localWebtoons.isLoading)}
          // onRequestClose={() => {
          //   this.setModalVisible(this.props.localWebtoons.isLoading)
          // }}
          style={{ backgroundColor: 'red' }}
        >
          <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.5)' }}>
            <View style={{ position: 'absolute', top: height / 2.3, left: width / 2.1 }}>
              <SpinIcon>
                <Icon name="spinner" size={30} style={{ color: "#fff", alignSelf: 'center' }} />
              </SpinIcon>
            </View>
          </View>
        </Modal> */}
        <View style={styles.header}>

          <TouchableOpacity onPress={() => this.props.navigation.navigate('Profile')} style={styles.headerBackBtn}>
            <Icon name="arrow-left" style={{ color: '#fff' }} size={23} />
          </TouchableOpacity>

          <Text style={styles.headerTitle}>My Webtoon Creation</Text>

        </View>

        <View style={{ flex: 1, borderTopWidth: 1, borderTopColor: '#4D4645' }}>
          {
            (this.props.localWebtoons.myWebtoons == false && this.props.localWebtoons.isLoading == false)
            ? <Text
                style={{color: '#fff', fontFamily: 'KOMIKAH_', textAlign: 'center', fontSize: 12, marginVertical: 30, width: '100%'}}>
                  You Not Have Webtoon.
              </Text>
            : <View></View>
          }
          <FlatList
            style={{flex: 1, display: this.state.dataVisible}}
            refreshing={this.props.localWebtoons.isLoading}
            refreshControl={
              <RefreshControl
                colors={['#ee7a33']}
                progressBackgroundColor="#383332"
                refreshing={this.props.localWebtoons.isLoading || (this.state.dataVisible == 'none' ? true : false)}
                onRefresh={() => this.loadData()}/>
            }
            showsHorizontalScrollIndicator={false}
            data={
              (!this.props.localWebtoons.myWebtoons) ? this.state.listMyWebtoon : this.props.localWebtoons.myWebtoons}
            renderItem={({ item, index }) =>
              <TouchableOpacity onPress={() => this.props.navigation.navigate('EditMyWebtoon', this.props.localWebtoons.myWebtoons[index])}>
                <Card style={styles.webtoonItem}>
                  <Thumbnail
                    onLoadStart={(e) => this.setState({preloadStatus: false})}
                    source={(this.state.preloadStatus) ? this.state.preloadImage : {uri: `${item.image}`}}
                    style={styles.webtoonImage} square />
                  <View>
                    <Text style={styles.webtoonTitle}>{item.title}</Text>
                    <Text style={styles.episodes}>{
                      (this.props.localWebtoons.myWebtoonsEpisodes != false)
                        ? (this.props.localWebtoons.myWebtoonsEpisodes.findIndex(x => x.webtoon_id == item.id) !== - 1)
                          ? this.props.localWebtoons.myWebtoonsEpisodes[this.props.localWebtoons.myWebtoonsEpisodes.findIndex(x => x.webtoon_id == item.id)].count
                          : '0'
                        : '0'
                    } Episode(s)</Text>
                  </View>
                </Card>
              </TouchableOpacity>
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

const mapStateToProps = state => {
  return {
    localWebtoons: state.webtoons,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    // ----------- Webtoons ------------//
    handleGetMyWebtoons: (params) => dispatch(actionWebtoon.handleGetMyWebtoons(params))
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
    paddingVertical: 17,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderColor: '#232222',
    height: 60
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
)(MyWebtoonCreation);