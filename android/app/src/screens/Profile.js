import React, { Component } from 'react';
import { View, StyleSheet, SafeAreaView} from 'react-native';
import {Button, Text, Input, Form, Label, Item, Container, Content, Thumbnail} from 'native-base'
import Icon from "react-native-vector-icons/FontAwesome5";

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
          
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    searchBox: {
        borderTopWidth: 2,
        borderLeftWidth: 2,
        borderRightWidth: 2,
        borderBottomWidth: 2,
        borderColor: '#ddd',
        borderRadius: 5,
        marginLeft: 10,
        marginTop: 8,
        marginBottom: 8,
        width: '94%',
        // flex: 1
    },
    searchBoxInput: {
        borderBottomWidth: 0
    },
    searchBoxIcon: {
      paddingVertical: 15,
      paddingHorizontal:12,
      borderLeftWidth: 2,
      borderLeftColor: '#ddd'
    },
    bannerContainer: {
      borderTopWidth: 2,
      borderLeftWidth: 2,
      borderRightWidth: 2,
      borderBottomWidth: 2,
      borderColor: '#ddd',
      borderRadius: 5,
      marginLeft: 10,
      width: '94%',
      height: 180
      // flex: 9
    },
    bannerImage: {
      borderWidth: 2,
      borderColor: '#ddd',
      width: '100%',
      height: '100%'
    },
    favoriteBanner: {
      borderTopWidth: 2,
      borderLeftWidth: 2,
      borderRightWidth: 2,
      borderBottomWidth: 2,
      borderColor: '#ddd',
      borderRadius: 5,
      marginTop: 10,
      marginLeft: 10,
      width: '94%',
      // height: 150
    },
    favoriteBannerTitle: {
      fontSize: 18,
      fontWeight: 'bold',
    },
    listAllToon: {
      borderTopWidth: 2,
      borderLeftWidth: 2,
      borderRightWidth: 2,
      borderBottomWidth: 2,
      borderColor: '#ddd',
      borderRadius: 5,
      marginTop: 10,
      marginLeft: 10,
      width: '94%',
      // height: 120
    }
})

export default Profile;
