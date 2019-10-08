import React, { Component } from 'react';
import { View, StyleSheet, SafeAreaView} from 'react-native';
import {Button, Text, Input, Form, Label, Item, Container, Content} from 'native-base'
import Icon from "react-native-vector-icons/FontAwesome5";

class For_You extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
          <Item style={styles.searchBox}>
              <Input style={styles.searchBoxInput}/>
              <Icon name="search" />
          </Item>
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
    container: {
        borderWidth: 1,
        borderColor: "red",
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
        width: '94%'
    },
    searchBoxInput: {
        borderBottomWidth: 0
    }
})

export default For_You;
