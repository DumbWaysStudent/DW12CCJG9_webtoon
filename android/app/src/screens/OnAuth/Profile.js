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
})

export default Profile;
