import React, { Component } from 'react';
import { View, Text, FlatList, StyleSheet, SafeAreaView, TouchableOpacity, Image, Share} from 'react-native';
import {Thumbnail} from 'native-base'
import Icon from "react-native-vector-icons/FontAwesome5";

class DetailWebtoon extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pageList: [
        {
          id: 1,
          image: require('../../main/assets/images/Noblesse/14587286121364423458.jpg'),
        },
        {
          id: 2,
          image: require('../../main/assets/images/Noblesse/14587286122444423453.jpg'),
        },
        {
          id: 3,
          image: require('../../main/assets/images/Noblesse/14587286122984423451.jpg'),

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

          <Text style={styles.headerTitle}>Ep.1</Text>

          <TouchableOpacity
            onPress={() => this.ShareMessage()}
            style={styles.headerShareBtn}>
            <Icon name="share-alt" size={23} />
          </TouchableOpacity>

        </View>
        <FlatList
            style={{width: '100%'}}
            showsVerticalScrollIndicator={false}
            data={this.state.pageList}
            renderItem={({ item }) => 
              <View style={styles.page}>
                <Image source={item.image} style={styles.pageImage} />
              </View>
            }
            keyExtractor={item => item.id}
          />
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
      borderBottomWidth: 1,
      borderColor: '#ddd'
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
    pageImage: {
        width: '100%',
        height: 500
    }
})

export default DetailWebtoon;
