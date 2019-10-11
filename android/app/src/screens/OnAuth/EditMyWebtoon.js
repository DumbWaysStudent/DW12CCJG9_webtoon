import React, { Component } from 'react';
import { View, StyleSheet, SafeAreaView, TouchableOpacity, FlatList, TextInput} from 'react-native';
import  { Text, Thumbnail, Item, Button } from 'native-base'
import Icon from "react-native-vector-icons/FontAwesome5";

class EditMyWebtoon extends Component {
  constructor(props) {
    super(props);
    this.state = {
        listEpisode: {
            '01': [
              {
                id: 1,
                title: 'Ep.1',
                image: require('../../main/assets/images/14587286205684423455.jpg'),
                lastUpdate: '1 Januari 2019'
              },
              {
                id: 2,
                title: 'Ep.2',
                series: 'Noblesse Awakening',
                image: require('../../main/assets/images/14587286394124423462.jpg'),
                lastUpdate: '7 Januari 2019'
              },
              {
                id: 3,
                title: 'Ep.3',
                series: 'Noblesse Awakening',
                image: require('../../main/assets/images/14593149300964423470.jpg'),
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
                <Icon name="arrow-left" size={23} />
            </TouchableOpacity>

            <Text style={styles.headerTitle}>Edit My Webtoon</Text>

            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('MyWebtoonCreation', {name: this.state.profileName, profilePic: this.state.profilePicture})}
              style={styles.headerOkBtn}>
              <Icon name="check" size={23} />
            </TouchableOpacity>
          </View>
          <View style={styles.createWebtoonPallete}>
              <View style={styles.palleteItem}>
                <Text style={styles.palleteItemTitle}>Title</Text>
                <TextInput style={styles.palleteItemInput} value="Noblesse" />
              </View>

              <View style={styles.palleteItem}>
                <Text style={styles.palleteItemTitle}>Episode</Text>
                <FlatList
                    showsHorizontalScrollIndicator={false}
                    data={this.state.listEpisode['01'].reverse()}
                    renderItem={({ item }) =>
                      <Item onPress={() => this.props.navigation.navigate('EditMyWebtoonEpisode', {prevScreen: 'EditMyWebtoon', name: item.title})} style={styles.episodeItem}>
                        <Thumbnail source={item.image}  style={styles.episodeImage} square />
                        <View style={styles.episodeInfo}>
                          <Text style={styles.episodeTitle}>{item.title}</Text>
                          <Text style={styles.episodeLastUpade}>{item.lastUpdate}</Text>
                        </View>
                      </Item>
                    }
                    keyExtractor={item => item.id}
                />
              </View>
              <Button style={styles.palleteBtn} onPress={() => this.props.navigation.navigate('CreateWebtoonEpisode', {prevScreen: 'EditMyWebtoon'})}>
                  <Text style={styles.palleteBtnText}>
                      <Icon name="plus" /> Add Episode
                  </Text>
              </Button>
              <Button style={[styles.palleteBtn, styles.palleteBtnRemove]}>
                <Text style={styles.palleteBtnText}>
                    Delete Webtoon
                </Text>
              </Button>
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
      headerBackBtn: {
        alignItems: 'center',
        padding: 6
      },
      headerTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        padding: 6
      },
      headerOkBtn: {
        flex: 1,
        flexDirection: 'row-reverse',
        padding: 6
      },
      palleteItem: {
          padding: 10,
          paddingHorizontal: 30
      },
      palleteItemTitle: {
          fontSize: 16,
          fontWeight: 'bold',
          marginBottom: 8
      },
      palleteItemInput: {
          borderWidth: 2,
          borderColor: '#444',
          borderRadius: 4,
          fontWeight: 'bold',
          paddingHorizontal: 8,
          fontSize: 16
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
          paddingHorizontal: 80,
          backgroundColor: '#fa9001',
          borderRadius: 6
      },
      palleteBtnRemove: {
        marginTop: 15,
        backgroundColor: 'red'
      },
      palleteBtnText: {
          alignSelf: 'center',
          textTransform: 'capitalize'
      }
})

export default EditMyWebtoon;
