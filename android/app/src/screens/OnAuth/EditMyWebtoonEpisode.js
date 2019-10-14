import React, { Component } from 'react';
import { View, StyleSheet, SafeAreaView, TouchableOpacity, FlatList, TextInput} from 'react-native';
import  { Text, Thumbnail, Item, Button } from 'native-base';
import Icon from "react-native-vector-icons/FontAwesome5";

class EditMyWebtoonEpisode extends Component {
  constructor(props) {
    super(props);
    this.state = {
        listEpisode: {
            '01': [
              {
                id: 1,
                title: '14587286205684423455.jpg',
                image: require('../../main/assets/images/Noblesse/14587286121364423458.jpg'),
              },
              {
                id: 2,
                title: '14587286394124423462.jpg',
                image: require('../../main/assets/images/Noblesse/14587286122444423453.jpg'),
              },
              {
                id: 3,
                title: '14593149300964423470.jpg',
                image: require('../../main/assets/images/Noblesse/14587286122984423451.jpg'),
              }
            ]
        }
    };
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
          <View style={styles.header}>

            <TouchableOpacity onPress={() => this.props.navigation.navigate(this.props.navigation.getParam('prevScreen'))} style={styles.headerBackBtn}>
                <Icon name="arrow-left" size={23} />
            </TouchableOpacity>

            <Text style={styles.headerTitle}>Edit Webtoon Episode</Text>

            <TouchableOpacity
              onPress={() => this.props.navigation.navigate(this.props.navigation.getParam('prevScreen'), {name: this.state.profileName, profilePic: this.state.profilePicture})}
              style={styles.headerOkBtn}>
              <Icon name="check" size={23} />
            </TouchableOpacity>
          </View>
          <View style={styles.createWebtoonEpPallete}>
            <View style={styles.palleteItem}>
              <Text style={styles.palleteItemTitle}>Name</Text>
              <TextInput style={styles.palleteItemInput} value={this.props.navigation.getParam('name')} />
            </View>
            <View style={styles.palleteItem}>
              <Text style={styles.palleteItemTitle}>Add Image</Text>
              <FlatList
                  showsHorizontalScrollIndicator={false}
                  data={this.state.listEpisode['01'].reverse()}
                  renderItem={({ item }) =>
                    <Item style={styles.imageItem}>
                      <Thumbnail source={item.image}  style={styles.image} square />
                      <View style={styles.imageInfo}>
                        <Text style={styles.imageTitle}>{item.id + '.' + item.title}</Text>
                    </View>
                  </Item>
                }
                keyExtractor={item => item.id}
              />
            </View>
            <Button style={styles.palleteBtn} onPress={() => this.props.navigation.navigate('CreateWebtoonEpisode')}>
                <Text style={styles.palleteBtnText}>
                  <Icon name="plus" /> Image
                </Text>
            </Button>
            <Button style={[styles.palleteBtn, styles.palleteBtnRemove]}>
                <Text style={styles.palleteBtnText}>
                    Delete Episode
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
      imageItem: {
          alignItems: 'flex-start',
          borderBottomWidth: 0,
          marginBottom: 15,
      },
      image: {
          borderWidth: 2,
          borderColor: '#444',
          width: 70,
          height: 70
      },
      imageInfo: {
          padding: 5,
          marginLeft: 8
      },
      imageTitle: {
        fontSize: 14,
        fontWeight: 'bold'
      },
      imageDeleteBtn: {
        width: '55%',
        paddingHorizontal: 13,
        backgroundColor: 'red'
      },
      imageDeleteText: {
        textTransform: 'capitalize',
        fontWeight: 'bold'
      },
      palleteBtn: {
          width: '82%',
          alignSelf: 'center',
          paddingHorizontal: 100,
          backgroundColor: '#fa9001',
          borderRadius: 6
      },
      palleteBtnText: {
          textTransform: 'capitalize'
      },
      palleteBtnRemove: {
        paddingHorizontal: 80,
        marginTop: 15,
        backgroundColor: 'red'
      },
})

export default EditMyWebtoonEpisode;