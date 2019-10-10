import React, { Component } from 'react';
import { View, StyleSheet, SafeAreaView, TouchableOpacity, Image} from 'react-native';
import  { Text } from 'native-base'
import Icon from "react-native-vector-icons/FontAwesome5";

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      profilePicture: require('../../main/assets/images/noblesse-awakening.jpg')
    };
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
          <View style={styles.header}>

            <View style={styles.headerTitle}>
              <Text style={styles.headerTitleText}>Profile</Text>
            </View>

            <TouchableOpacity
              style={styles.headerEditBtn}>
              <Icon name="check" size={23} />
            </TouchableOpacity>

          </View>
          <View style={styles.profilePicture}>
              <Image source={this.state.profilePicture} />
            </View>
            <View style={styles.options}>
              <TouchableOpacity style={styles.optionsItem}>
                <Text style={styles.optionsText}>My Webtoon Creation <Icon name="angle-right" size={20} /></Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.optionsItem}>
                <Text style={styles.optionsText}>Log Out</Text>
              </TouchableOpacity>
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
  headerTitle: {
    flex: 1,
    flexDirection: 'row',
    padding: 6
  },
  headerTitleText: {
    fontSize: 16,
    fontWeight: 'bold'
  },
  headerEditBtn: {
    flex: 1,
    flexDirection: 'row-reverse',
    padding: 6
  },
})

export default Profile;
